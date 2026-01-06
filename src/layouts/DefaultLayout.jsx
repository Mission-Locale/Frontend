import Footer from "../components/Footer";
import Header from "../components/Header";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer, Slide } from "react-toastify";
import { useFormStore } from "@/stores/useFormStore";

export default function DefaultLayout() {
  const location = useLocation();
  const currentStep = useFormStore((state) => state.currentStep);
  
  // afficher le header partout sauf sur /register (sauf si étape 5)
  const showHeader = location.pathname !== "/register" || currentStep === 5;

  return (
    <>
      {showHeader && <Header />}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        newestOnTop
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="light"
        transition={Slide}
      />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
