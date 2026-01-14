import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./middleswares/PrivateRoutes";
import DashboardRoutes from "./middleswares/DashboardRoutes";
import DefaultLayout from "../layouts/DefaultLayout";
import RegisterUser from "../layouts/RegisterUser/RegisterUser";
import Connexion from "@/pages/Connexion";
import { JOB_SEEKER, ADVISOR, ADMINISTRATOR } from "../utils/userRole";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route d'inscription */}
        <Route path="/register" element={<RegisterUser />} />
        {/* Route de connexion */}
        <Route path="/login" element={<Connexion />} />
        <Route element={<DefaultLayout />}>
          {/* Vitrine */}
          {/* TODO: <Route path="/" index element={<HomePage />} /> */}
          <Route element={<PrivateRoutes />}>
            <Route element={<DashboardRoutes role={JOB_SEEKER} redirect="/" />}>
              {/* Routes des Demandeurs d'emploi */}
            </Route>
            <Route element={<DashboardRoutes role={ADVISOR} redirect="/" />}>
              {/* Routes des Conseillers */}
            </Route>
            <Route element={<DashboardRoutes role={ADMINISTRATOR} redirect="/" />}>
              {/* Routes des Administrateurs */}
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
