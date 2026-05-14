import apiClient from "../api/apiClient";
import type { ApiResponse } from "../types/api-response";

const AUTH_API = "/api/auth";

const TOKEN_KEY = "jwt_token";
const USERNAME_KEY = "username";
const ROLE_KEY = "role";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  role?: string;
}

export interface LoginData {
  token: string;
  username: string;
  role: string;
}

export const login = async (
  request: LoginRequest
): Promise<LoginData> => {
  const response =
    await apiClient.post<ApiResponse<LoginData>>(
      `${AUTH_API}/login`,
      request
    );

  const data = response.data.data;

  localStorage.setItem(TOKEN_KEY, data.token);
  localStorage.setItem(USERNAME_KEY, data.username);

  // If backend returns role, store it
  if (data.role) {
    localStorage.setItem(ROLE_KEY, data.role);
  }

  return data;
};

export const register = async (
  request: RegisterRequest
): Promise<void> => {
  const payload: RegisterRequest = {
    username: request.username,
    password: request.password
  };

  if (request.role && request.role.trim() !== "") {
    payload.role = request.role;
  }

  await apiClient.post(`${AUTH_API}/register`, payload);
};

export const logout = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USERNAME_KEY);
  localStorage.removeItem(ROLE_KEY);
};

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const getUsername = (): string | null => {
  return localStorage.getItem(USERNAME_KEY);
};

export const getRole = (): string | null => {
  return localStorage.getItem(ROLE_KEY);
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};

export const isAdmin = (): boolean => {
  return getRole() === "ADMIN";
};

export const isUser = (): boolean => {
  return getRole() === "USER";
};

export const authService = {
  login,
  register,
  logout,
  getToken,
  getUsername,
  getRole,
  isAuthenticated,
  isAdmin,
  isUser
};

export default authService;