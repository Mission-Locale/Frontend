import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./middleswares/PrivateRoutes";
import DashboardRoutes from "./middleswares/DashboardRoutes";
import DefaultLayout from "../layouts/DefaultLayout";
import { USER, ADVISOR, ADMIN } from "../utils/userRole";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          {/* Vitrine */}
          {/* TODO: <Route path="/" index element={<HomePage />} /> */}
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
