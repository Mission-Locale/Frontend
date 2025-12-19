import { useFormStore } from "../../stores/useFormStore";
import StepIndicator from "./StepIndicator";
import { STEPS } from "@/utils/userForm.js";

export default function SideBar() {
  const currentStep = useFormStore((state) => state.currentStep);

  return (
    <div className="w-90 text-white p-8 bg-brandBlue h-screen">

      {/* TODO: Ajouter bonne couleur de fond selon le step */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Étape {currentStep}</h2>
        <p className="text-blue-100 text-md h-20">
          {STEPS[currentStep - 1].description}
        </p>
      </div>
      <div className="space-y-20">
        {STEPS.map((step, index) => (
          <StepIndicator
            key={step.id}
            step={step}
            currentStep={currentStep}
            isLast={index === STEPS.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
