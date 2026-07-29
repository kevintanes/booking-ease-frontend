import api from "@/config/api";
import type { RegisterFormValues } from "@/lib/validations/auth";

export const registerUser = async (user: RegisterFormValues) => {
  const result = await api.post(`/auth/register`, user);
  return result.data;
};
