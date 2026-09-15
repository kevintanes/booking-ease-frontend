import { toast } from "@/components/ui/toast";
import { useAuth } from "@/context/authContext";
import { getMe } from "@/services/authService";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const AuthCallbackPage = () => {
  const [params] = useSearchParams();
  const { setAuth, setToken } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get("token");

    if (!token) {
      toast.add({ type: "error", description: "Sign In Failed" });
      navigate("/login");
      return;
    }

    setToken(token);

    getMe()
      .then((res) => {
        const user = res.data?.user;
        setAuth(user, token);
        toast.add({
          type: "success",
          description: `Welcome ${user.name.split(" ")[0]}!`,
        });
        navigate("/");
      })
      .catch(() => {
        toast.add({
          type: "error",
          description: "Sign In Failed",
        });
        navigate("/login");
      });
  }, []);

  return <div>AuthCallbackPage</div>;
};

export default AuthCallbackPage;
