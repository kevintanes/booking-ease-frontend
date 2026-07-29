import type { User } from "./user";
import type { RegisterFormValues } from "@/lib/validations/auth";

export interface AuthContextType {
  user: User | undefined;
  token: string;
  register: (user: RegisterFormValues) => Promise<void>;
}
