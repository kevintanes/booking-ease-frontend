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

const getStoredUser = (): User | undefined => {
  try {
    const raw = localStorage.getItem("user");
    return raw ? (JSON.parse(raw) as User) : undefined;
  } catch {
    return undefined;
  }
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | undefined>(getStoredUser);
  const [token, setTokenState] = useState(
    () => localStorage.getItem("token") || "",
  );
  const isAuthenticated = !!token;
  const navigate = useNavigate();

  const setToken = (token: string) => {
    setTokenState(token);
    localStorage.setItem("token", token);
  };

  const setAuth = (user: User, token: string) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const register = async (formValues: RegisterFormValues) => {
    try {
      const result = await registerUser(formValues);

      if (result.success === true) {
        setAuth(result.data.user, result.data.token);
        toast.add({ type: "success", description: "User created" });
        navigate("/");
        return;
      }

      toast.add({
        type: "error",
        description: "Registration failed. Please try again.",
      });
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
        setAuth(result.data.user, result.data.token);
        toast.add({ type: "success", description: "Login success" });
        navigate("/");
        return;
      }

      toast.add({
        type: "error",
        description: "Login failed. Please try again.",
      });
    } catch (error) {
      toast.add({
        type: "error",
        description: getErrorMessage(error, "Login failed. Please try again."),
      });
    }
  };

  const logout = () => {
    setUser(undefined);
    setTokenState("");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        register,
        token,
        user,
        login,
        isAuthenticated,
        logout,
        setAuth,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
