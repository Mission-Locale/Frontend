import { useFormStore } from "@/stores/useFormStore";
import StepIndicator from "./StepIndicator";
import { STEPS } from "@/utils/userRegister.js";
import { bg } from "@/styles/tokensTailwind";
import useMobileToggle from "@/hooks/useMobileToggle";

export default function SideBar() {
  const currentStep = useFormStore((state) => state.currentStep);
  const branding = STEPS[currentStep - 1]?.branding;

  const isMobile = useMobileToggle();

  if (isMobile) {
    return (
      <div className="w-full sm:w-3/4 sm:mx-auto">
        <div className="flex justify-center items-center mb-4 px-6 ">
          {STEPS.map((step, index) => (
            <StepIndicator
              key={step.id}
              step={step}
              currentStep={currentStep}
              isLast={index === STEPS.length - 1}
              branding={branding}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`w-90 text-white p-8 ${bg[branding]} xl:min-h-screen`}>
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Étape {currentStep}</h2>
        <p className="text-white text-md h-20">
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
            branding={branding}
            isMobile={isMobile}
          />
        ))}
      </div>
    </div>
  );
}
