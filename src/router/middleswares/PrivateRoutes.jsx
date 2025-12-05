import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoutes() {
  const token = null; // TODO: Complete with Token Storage
  return token != null ? <Outlet /> : <Navigate to="/login" />;
}
