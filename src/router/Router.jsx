import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./middleswares/PrivateRoutes";
import DashboardRoutes from "./middleswares/DashboardRoutes";
import DefaultLayout from "../layouts/DefaultLayout";
import RegisterUser from "../layouts/RegisterUser/RegisterUser";
import Connexion from "@/pages/Connexion";
import { JOB_SEEKER, ADVISOR, ADMINISTRATOR } from "../utils/userRole";
import Dashboard from "@/layouts/Dashboard";
import AdvisorList from "@/pages/AdvisorList";

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

            <Route element={<Dashboard />}>
                <Route path="/advisor-list" element={<AdvisorList />} />
            </Route>
            
          <Route element={<PrivateRoutes />}>
            <Route element={<DashboardRoutes role={JOB_SEEKER} redirect="/" />}>
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
