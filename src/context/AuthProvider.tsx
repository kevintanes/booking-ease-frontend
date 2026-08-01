import { toast } from "@/components/ui/toast";
import { getErrorMessage } from "@/lib/handleApiError";
import type {
  LoginFormValues,
  RegisterFormValues,
} from "@/lib/validations/auth";
import { loginUser, registerUser } from "@/services/authService";
import type { User } from "@/types/user";
import { useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./authContext";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [token, setToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const register = async (user: RegisterFormValues) => {
    try {
      const result = await registerUser(user);

      if (result.success === true) {
        setUser(result.data.user);
        setToken(result.data.token);
        setIsAuthenticated(true);
        toast.add({
          type: "success",
          description: "User created",
        });
        localStorage.setItem("token", result.data.token);
        navigate("/");
      }
    } catch (error) {
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

      if (result.success === true) {
        setUser(result.data.user);
        setToken(result.data.token);
        setIsAuthenticated(true);
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

  const logout = () => {
    setUser(undefined);
    setToken("");
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ register, token, user, login, isAuthenticated, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
