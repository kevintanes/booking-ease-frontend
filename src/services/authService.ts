import api from "@/config/api";
import type {
  LoginFormValues,
  RegisterFormValues,
} from "@/lib/validations/auth";

export const registerUser = async (user: RegisterFormValues) => {
  const result = await api.post(`/auth/register`, user);
  return result.data;
};

export const loginUser = async ({ email, password }: LoginFormValues) => {
  const result = await api.post(`/auth/login`, { email, password });
  return result.data;
};

export const getMe = async () => {
  const result = await api.get("/auth/me");
  return result.data;
};
