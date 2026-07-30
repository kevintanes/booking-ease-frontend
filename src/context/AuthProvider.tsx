import { loginUser, registerUser } from "@/services/authService";
import { AuthContext } from "./authContext";
import { useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/toast";
import type { User } from "@/types/user";
import type {
  LoginFormValues,
  RegisterFormValues,
} from "@/lib/validations/auth";
import axios from "axios";
import { getErrorMessage } from "@/lib/handleApiError";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const register = async (user: RegisterFormValues) => {
    try {
      const result = await registerUser(user);

      if (result.success === true) {
        setUser(result.data.user);
        setToken(result.data.token);
        toast.add({
          type: "success",
          description: "User created",
        });
        localStorage.setItem("token", result.data.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error);

      toast.add({
        type: "error",
        description: getErrorMessage(
          error,
          "Registration failed. Please try again.",
        ),
      });
    }
  };

  const login = async ({ email, password }: LoginFormValues) => {
    try {
      const result = await loginUser({ email, password });
      console.log({ result });

      if (result.success === true) {
        setUser(result.data.user);
        setToken(result.data.token);
        toast.add({
          type: "success",
          description: "Login success",
        });
        localStorage.setItem("token", result.data.token);
        navigate("/");
      }
    } catch (error) {
      toast.add({
        type: "error",
        description: getErrorMessage(error, "Login failed. Please try again."),
      });
    }
  };

  return (
    <AuthContext.Provider value={{ register, token, user, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
