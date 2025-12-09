import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer, Slide } from "react-toastify";

export default function DefaultLayout() {
  return (
    <>
      {/* TODO: <Header /> */}
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
      <Outlet />
      <Footer />
    </>
  );
}
