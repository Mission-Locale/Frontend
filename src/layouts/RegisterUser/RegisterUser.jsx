import SideBar from "@/components/registerUser/SideBar";
import ContentStep from "./ContentStep";
import { useFormStore } from "@/stores/useFormStore";


export default function RegisterUser() {
  const currentStep = useFormStore((state) => state.currentStep);
  // const setCurrentStep = useFormStore((state) => state.setCurrentStep);

  // setCurrentStep(1);

  return (
    <div className="min-h-dvh xl:h-dvh flex flex-col bg-gray-50">
      <div className="flex flex-1 overflow-hidden">
        {currentStep !== 5 && <SideBar />}
        <ContentStep />
      </div>
    </div>
  );
}
