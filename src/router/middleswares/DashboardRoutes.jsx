import { Navigate, Outlet } from "react-router-dom";
import { getUserRole } from "../../utils/storage";

export default function DashboardRoutes({ role, redirect = "/" }) {
  const userRole = getUserRole();
  return userRole == role ? <Outlet /> : <Navigate to={redirect} />;
}
