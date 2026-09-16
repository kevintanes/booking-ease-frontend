import { useAuth } from "@/context/authContext";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  isAdminOnly?: boolean;
}

const ProtectedRoute = ({ isAdminOnly }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (isAdminOnly && user?.role !== "ADMIN") return <Navigate to="/" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
