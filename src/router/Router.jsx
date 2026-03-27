import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoutes from "./middleswares/PrivateRoutes";
import DashboardRoutes from "./middleswares/DashboardRoutes";
import DefaultLayout from "../layouts/DefaultLayout";
import RegisterUser from "../layouts/RegisterUser/RegisterUser";
import Connexion from "@/pages/Connexion";
import ResetPassword from "@/pages/ResetPassword";
import { JOB_SEEKER, ADVISOR, ADMINISTRATOR } from "../utils/userRole";
import Dashboard from "@/layouts/Dashboard";
import AdvisorList from "@/pages/AdvisorList";
import AdvisorPlanningPage from "@/pages/advisor/PlanningPage";
import JobSeekerPlanningPage from "@/pages/jobSeeker/PlanningPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route d'inscription */}
        <Route path="/register" element={<RegisterUser />} />
        {/* Route de connexion */}
        <Route path="/login" element={<Connexion />} />
        {/* Route de réinitialisation de mot de passe */}
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route element={<DefaultLayout />}>
          {/* Vitrine */}
          {/* TODO: <Route path="/" index element={<HomePage />} /> */}

          <Route element={<PrivateRoutes />}>
            <Route element={<Dashboard />}>
              <Route
                element={<DashboardRoutes role={JOB_SEEKER} redirect="/" />}
              >
                {/* Routes des Demandeurs d'emploi */}
                <Route index path="/" element={<Navigate to="planning" />} />
                <Route path="/planning" element={<JobSeekerPlanningPage />} />
              </Route>
              <Route element={<DashboardRoutes role={ADVISOR} redirect="/" />}>
                {/* Routes des Conseillers */}
                <Route index path="/" element={<Navigate to="planning" />} />
                <Route path="/planning" element={<AdvisorPlanningPage />} />
              </Route>
              <Route
                element={<DashboardRoutes role={ADMINISTRATOR} redirect="/" />}
              >
                {/* Routes des Administrateurs */}
                <Route
                  index
                  path="/"
                  element={<Navigate to="advisor-list" />}
                />
                <Route path="/advisor-list" element={<AdvisorList />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
