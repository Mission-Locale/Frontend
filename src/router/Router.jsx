import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./middleswares/PrivateRoutes";
import DashboardRoutes from "./middleswares/DashboardRoutes";
import DefaultLayout from "../layouts/DefaultLayout";
import RegisterUser from "../layouts/RegisterUser/RegisterUser";
import { USER, ADVISOR, ADMIN } from "../utils/userRole";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
          {/* Route d'inscription */}
          <Route path="/register" element={<RegisterUser />} />
        <Route element={<DefaultLayout />}>
          
          {/* Vitrine */}
          {/* <Route path="/" index element={<HomePage />} /> */}
          <Route element={<PrivateRoutes />}>
            <Route element={<DashboardRoutes role={USER} redirect="/" />}>
              {/* Routes des Demandeurs d'emploi */}
            </Route>
            <Route element={<DashboardRoutes role={ADVISOR} redirect="/" />}>
              {/* Routes des Conseillers */}
            </Route>
            <Route element={<DashboardRoutes role={ADMIN} redirect="/" />}>
              {/* Routes des Administrateurs */}
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
