import type { User } from "./user";
import type {
  LoginFormValues,
  RegisterFormValues,
} from "@/lib/validations/auth";

export interface AuthContextType {
  user: User | undefined;
  token: string;
  register: (user: RegisterFormValues) => Promise<void>;
  login: (data: LoginFormValues) => Promise<void>;
  isAuthenticated: boolean;
}
