import axios from "axios";

export const extractErrorMessage = (
  error: unknown
): string => {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Unexpected API error."
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Unexpected error occurred.";
};