import axios from "axios";

export const getErrorMessage = (
  error: unknown,
  fallback = "Something went wrong",
) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message ?? fallback;
  }
  return fallback;
};
