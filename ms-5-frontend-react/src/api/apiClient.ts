import axios from "axios";
import { authService } from "../services/authService";
import { Logger } from "../services/logger";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = authService.getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    Logger.apiRequest(
      config.method?.toUpperCase() || "UNKNOWN",
      config.url || "",
      config.data
    );

    return config;
  },
  (error) => {
    Logger.error(
      "Request interceptor failed",
      error
    );

    return Promise.reject(error);
  }
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => {
    Logger.apiResponse(
      response.config.method?.toUpperCase() || "UNKNOWN",
      response.config.url || "",
      response.data
    );

    return response;
  },
  (error) => {
    const method =
      error.config?.method?.toUpperCase() || "UNKNOWN";

    const url =
      error.config?.url || "";

    Logger.apiError(
      method,
      url,
      error.response?.data || error.message
    );

    // Automatically logout on unauthorized
    if (error.response?.status === 401) {
      Logger.warn(
        "JWT token expired or invalid. Redirecting to login."
      );

      authService.logout();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default apiClient;