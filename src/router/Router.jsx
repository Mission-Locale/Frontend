import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoutes from "./middleswares/PrivateRoutes";
import DashboardRoutes from "./middleswares/DashboardRoutes";
import DefaultLayout from "../layouts/DefaultLayout";
import RegisterUser from "../layouts/RegisterUser/RegisterUser";
import Connexion from "@/pages/Connexion";
import ResetPassword from "@/pages/ResetPassword";
import { JOB_SEEKER, ADVISOR, ADMINISTRATOR } from "../utils/userRole";
import Dashboard from "@/layouts/Dashboard";
import AdvisorList from "@/pages/administrator/AdvisorList";
import AdvisorPlanningPage from "@/pages/advisor/PlanningPage";
import JobSeekerPlanningPage from "@/pages/jobSeeker/PlanningPage";
import WorkshopPlanningPage from "@/pages/workshop/WorkshopPlanningPage";
import WorkshopPage from "@/pages/workshop/WorkshopPage";
import HomePage from "@/pages/HomePage";

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
          <Route path="/" index element={<HomePage />} />
          <Route path="/workshop" element={<WorkshopPlanningPage />} />
          <Route path="/workshop/:id" element={<WorkshopPage />} />

          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route
                path="user"
                element={<DashboardRoutes role={JOB_SEEKER} redirect="/" />}
              >
                {/* Routes des Demandeurs d'emploi */}
                <Route
                  index
                  path=""
                  element={<Navigate to="/dashboard/user/planning" />}
                />
                <Route path="planning" element={<JobSeekerPlanningPage />} />
              </Route>
              <Route
                path="advisor"
                element={<DashboardRoutes role={ADVISOR} redirect="/" />}
              >
                {/* Routes des Conseillers */}
                <Route
                  index
                  path=""
                  element={<Navigate to="/dashboard/advisor/planning" />}
                />
                <Route path="planning" element={<AdvisorPlanningPage />} />
              </Route>
              <Route
                path="admin"
                element={<DashboardRoutes role={ADMINISTRATOR} redirect="/" />}
              >
                {/* Routes des Administrateurs */}
                <Route
                  index
                  path=""
                  element={<Navigate to="/dashboard/admin/advisor-list" />}
                />
                <Route path="advisor-list" element={<AdvisorList />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
