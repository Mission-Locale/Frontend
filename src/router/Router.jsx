import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./middleswares/PrivateRoutes";
import DefaultLayout from "../layouts/DefaultLayout";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          {/* TODO: <Route path="/" index element={<HomePage />} /> */}
        </Route>
        <Route element={<PrivateRoutes />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
