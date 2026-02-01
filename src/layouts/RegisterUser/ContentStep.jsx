import { useFormStore } from "@/stores/useFormStore";
import { STEPS } from "@/utils/userRegister";
import { useState } from "react";
import { registerUser } from "@/utils/api";
import logo from "/assets/img/Logo_Mission_Locale.webp";
import ContentStep1 from "@/components/registerUser/ContentStep1";
import ContentStep2 from "@/components/registerUser/ContentStep2";
import ContentStep3 from "@/components/registerUser/ContentStep3";
import ContentStep4 from "@/components/registerUser/ContentStep4";
import ContentStep5 from "@/components/registerUser/ContentStep5";
import Button from "@/components/ui/Button";
import useMobileToggle from "@/hooks/useMobileToggle";

const steps = [
  ContentStep1,
  ContentStep2,
  ContentStep3,
  ContentStep4,
  ContentStep5,
];

export default function ContentStep() {
  // Récupération de l'état du formulaire depuis le store
  const currentStep = useFormStore((state) => state.currentStep);
  const setCurrentStep = useFormStore((state) => state.setCurrentStep);
  const handleBack = useFormStore((state) => state.prevStep);
  const handleNext = useFormStore((state) => state.nextStep);
  const personalInfo = useFormStore((state) => state.personalInfo);
  const canProceedFromStep1 = useFormStore(
    (state) => state.canProceedFromStep1
  );

  const { mainTitle, subTitle, branding } = STEPS[currentStep - 1] || {};

  const isMobile = useMobileToggle();

  // const uploadedDocs = useFormStore((state) => state.uploadedDocs); TODO: A DECOMMENTER LORS DE L'IMPLEMENTATION DU STEP 3 POUR L'API
  // const appointment = useFormStore((state) => state.appointment); TODO: A DECOMMENTER LORS DE L'IMPLEMENTATION DU STEP 4

  // state pour déclencher l'affichage des erreurs
  const [showErrors, setShowErrors] = useState(false);
  const [emailError, setEmailError] = useState(null);

  // state pour l'envoi du formulaire
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fonction pour envoyer les données du formulaire à l'API
  async function sendFormData() {
    setIsSubmitting(true);
    setEmailError(null);

    try {
      //TODO IMPLENETER L'ENVOI DES DOCUMENTS ET DE LA DATE DE RDV AVEC uploadedDocs et appointment
      const formData = {
        first_name: personalInfo.firstName,
        last_name: personalInfo.lastName,
        email: personalInfo.email,
        phone: personalInfo.phone,
        birth_date: personalInfo.birthDate,
        password: personalInfo.password,
        confirm_password: personalInfo.confirmPassword,
        // roleType: "ADMINISTRATOR",
        roleType: "JOB_SEEKER",
        // roleType: "ADVISOR",
      };
      await registerUser(formData);
      handleNext();
    } catch (error) {
      if (error.code === "P2002") {
        setCurrentStep(1);
        setEmailError("Cet email est déjà utilisé");
        setShowErrors(true);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentStep === 4) {
      sendFormData();
    } else {
      handleNextStep();
    }
  };

  // Fonction pour gérer le passage à l'étape suivante
  const handleNextStep = () => {
    if (currentStep === 1) {
      if (canProceedFromStep1()) {
        setShowErrors(false);
        handleNext();
      } else {
        setShowErrors(true);
      }
    } else {
      handleNext();
    }
  };

  const StepComponent = steps[currentStep - 1];

  return (
    <div
      className={`flex-1 py-4 px-8 flex flex-col ${
        currentStep === 5 ? "bg-brandOrange min-h-[90dvh]" : "min-h-[80dvh]"
      }`}
    >
      {currentStep !== 5 && (
        <>
          {!isMobile && (
            <div className="w-46 mb-4">
              <img src={logo} alt="logo mission locale" />
            </div>
          )}

          <div
            className={`${
              showErrors && currentStep === 1 ? "mb-4" : "mb-6"
            } text-center`}
          >
            {mainTitle && (
              <h2 className="text-2xl sm:text-3xl font-medium mb-2">
                {mainTitle}
              </h2>
            )}
            {subTitle && (
              <p className="text-xl font-light text-gray-600 mx-auto whitespace-pre-line">
                {subTitle}
              </p>
            )}
          </div>
        </>
      )}

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4">
        <div className="flex-1 xl:flex xl:flex-col mx-auto">
          <StepComponent
            key={currentStep - 1}
            currentStep={currentStep}
            branding={branding}
            showErrors={currentStep === 1 ? showErrors : false}
            emailError={currentStep === 1 ? emailError : null}
          />
        </div>

        {currentStep !== 5 && (
          <div className="flex flex-col-reverse gap-3 w-2/3 mx-auto sm:w-full sm:flex-row justify-between px-7">
            <Button
              text={`${currentStep === 1 ? "Annuler" : "Retour"}`}
              color={branding}
              size="md"
              variant="outline"
              radiusSize="sm"
              width="full"
              onClick={() => handleBack()}
              disabled={isSubmitting}
            />

            <div className="flex flex-col sm:flex-row gap-4">
              {currentStep === 3 && (
                <Button
                  text="Passer cette étape"
                  color={branding}
                  size="md"
                  variant="ghost"
                  radiusSize="sm"
                  width="full"
                  onClick={() => handleNext()}
                  disabled={isSubmitting}
                />
              )}

              <Button
                text={`${
                  currentStep === 4 ? "Terminer l'inscription" : "Suivant"
                }`}
                color={branding}
                size="md"
                variant="full"
                radiusSize="sm"
                width="full"
                type="submit"
                disabled={isSubmitting}
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
