import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function PrivateRoutes() {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return null; //TODO: Add a Loading Screen here
  }
  
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
