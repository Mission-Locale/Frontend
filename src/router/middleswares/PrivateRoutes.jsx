import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../../utils/storage";

export default function PrivateRoutes() {
  return getToken() != null ? <Outlet /> : <Navigate to="/login" />;
}
