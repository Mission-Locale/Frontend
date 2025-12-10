import ContentStep1 from "../../components/RegisterUser/ContentStep1";
import ContentStep2 from "../../components/RegisterUser/ContentStep2";
import ContentStep3 from "../../components/RegisterUser/ContentStep3";
import ContentStep4 from "../../components/RegisterUser/ContentStep4";

export default function ContentStep({ currentStep, handleBack, handleNext }) {
  const steps = [ContentStep1, ContentStep2, ContentStep3, ContentStep4];

  return (
    <div>
      {steps.map((StepComponent, index) => {
        if (index + 1 === currentStep) {
          return (
            <StepComponent
              key={index}
              currentStep={currentStep}
              handleBack={handleBack}
              handleNext={handleNext}
            />
          );
        }
      })}
    </div>
  );
}
