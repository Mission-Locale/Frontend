import { useFormStore } from "@/stores/useFormStore";
import { STEPS } from "@/utils/userForm";
import logo from "/assets/img/Logo_Mission_Locale.webp";
import ContentStep1 from "@/components/registerUser/ContentStep1";
import ContentStep2 from "@/components/registerUser/ContentStep2";
import ContentStep3 from "@/components/registerUser/ContentStep3";
import ContentStep4 from "@/components/registerUser/ContentStep4";
import Button from "@/components/ui/Button";

export default function ContentStep() {
  const currentStep = useFormStore((state) => state.currentStep);
  const handleBack = useFormStore((state) => state.prevStep);
  const handleNext = useFormStore((state) => state.nextStep);

  const steps = [ContentStep1, ContentStep2, ContentStep3, ContentStep4];

  const ActiveStep = steps[currentStep - 1] || null;
  const { mainTitle, subTitle } = STEPS[currentStep - 1] || {};

  return (
    <div className="flex-1 py-12 px-8">
      <div className="h-full flex flex-col justify-between gap-4">
        <div className="w-46">
          <img src={logo} alt="" />
        </div>

        <div className="mb-6 text-center">
          {mainTitle && <h2 className="text-3xl font-medium mb-2">{mainTitle}</h2>}
          {subTitle && (
            <p className="text-xl font-light text-gray-600 mx-auto whitespace-pre-line">{subTitle}</p>
          )}
        </div>

        <div className="flex-1 flex flex-col min-w-4/5 mx-auto justify-center">
          {ActiveStep && <ActiveStep key={currentStep} />}
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
