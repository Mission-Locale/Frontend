import { useFormStore } from "../../stores/useFormStore";
import logo from "/assets/img/Logo_Mission_Locale.webp";
import ContentStep1 from "../../components/RegisterUser/ContentStep1";
import ContentStep2 from "../../components/RegisterUser/ContentStep2";
import ContentStep3 from "../../components/RegisterUser/ContentStep3";
import ContentStep4 from "../../components/RegisterUser/ContentStep4";
import Button from "../../components/ui/Button";

export default function ContentStep() {
  const currentStep = useFormStore((state) => state.currentStep);
  const handleBack = useFormStore((state) => state.prevStep);
  const handleNext = useFormStore((state) => state.nextStep);

  const steps = [ContentStep1, ContentStep2, ContentStep3, ContentStep4];

  return (
    <div className="flex-1 py-12 px-8">
      <div className="h-full flex flex-col justify-between gap-4">
        <div className="w-46">
          <img src={logo} alt="" />
        </div>

        <div className="flex-1 flex flex-col min-w-full mx-auto justify-center">
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

        <div className="flex justify-between px-7">
          <Button
            text={`${currentStep === 1 ? "Annuler" : "Retour"}`}
            color="brandBlue"
            size="md"
            variant="outline"
            radiusSize="sm"
            width="full"
            onClick={() => handleBack()}
          />

          <div className="flex gap-4">
            {currentStep === 3 && (
              <Button
                text="Passer cette étape"
                color="brandBlue"
                size="md"
                variant="ghost"
                radiusSize="sm"
                width="full"
                onClick={() => handleNext()}
              />
            )}

            <Button
              text="Étape suivante"
              color="brandBlue"
              size="md"
              variant="full"
              radiusSize="sm"
              width="full"
              onClick={() => handleNext()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
