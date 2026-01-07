import { useEffect } from "react";
import SideBar from "@/components/registerUser/SideBar";
import ContentStep from "./ContentStep";
import { useFormStore } from "@/stores/useFormStore";
import useMobileToggle from "@/hooks/useMobileToggle";
import logo from "/assets/img/Logo_Mission_Locale.webp";


export default function RegisterUser() {
  const currentStep = useFormStore((state) => state.currentStep);

  const isMobile = useMobileToggle();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  return (
    <div className="min-h-dvh xl:h-dvh flex flex-col bg-gray-50">
      <div className={`${isMobile ? "" : "flex flex-1 overflow-hidden"}`}>
        {isMobile && (
          <div className="w-46 p-4 flex justify-center items-center mb-4 mx-auto">
            <img src={logo} alt="logo mission locale" />
          </div>
        )}
        {currentStep !== 5 && <SideBar />}
        <ContentStep />
      </div>
    </div>
  );
}
