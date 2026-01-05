import { useFormStore } from "@/stores/useFormStore";
import { STEPS } from "@/utils/userForm";
import { useState } from "react";
import { registerUser } from "@/utils/api";
import logo from "/assets/img/Logo_Mission_Locale.webp";
import ContentStep1 from "@/components/registerUser/ContentStep1";
import ContentStep2 from "@/components/registerUser/ContentStep2";
import ContentStep3 from "@/components/registerUser/ContentStep3";
import ContentStep4 from "@/components/registerUser/ContentStep4";
import Button from "@/components/ui/Button";

export default function ContentStep() {
  // Récupération de l'état du formulaire depuis le store
  const currentStep = useFormStore((state) => state.currentStep);
  const handleBack = useFormStore((state) => state.prevStep);
  const handleNext = useFormStore((state) => state.nextStep);
  const canProceedFromStep1 = useFormStore(
    (state) => state.canProceedFromStep1
  );

  const personalInfo = useFormStore((state) => state.personalInfo);
  // const uploadedDocs = useFormStore((state) => state.uploadedDocs); TODO: A DECOMMENTER LORSQUE LE STEP 1 SERA BIEN IMPLEMENTE
  // const appointment = useFormStore((state) => state.appointment); TODO: A DECOMMENTER LORS DE L'IMPLEMENTATION DU STEP 4

  // state pour l'envoi du formulaire
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [submitError, setSubmitError] = useState(false); // TODO: A DECOMMENTER LORS DE L'IMPLEMENTATION DE LA GESTION D'ERREUR D'ENVOI (bool)

  async function sendFormData() {
    setIsSubmitting(true);
    // setSubmitError(null); TODO: A DECOMMENTER LORS DE L'IMPLEMENTATION DE LA GESTION D'ERREUR D'ENVOI

    try {
      //TODO Preparer le body
      const formData = {
        first_name: personalInfo.firstName,
        last_name: personalInfo.lastName,
        email: personalInfo.email,
        phone: personalInfo.phone,
        birth_date: personalInfo.birthDate,
        password: personalInfo.password,
        confirm_password: personalInfo.confirmPassword,
        roleType: 'JOB_SEEKER',
        // file: uploadedDocs? TODO: A DECOMMENTER LORSQUE LE STEP 1 SERA BIEN IMPLEMENTE
        // appointment, TODO: A DECOMMENTER LORS DE L'IMPLEMENTATION DU STEP 4
      };

      console.log("Données du formulaire à envoyer :", formData);

      const response = await registerUser(formData);

      console.log("Réponse de l'inscription :", response);

      // TODO rediriger l'utilisateur sur le step orange
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      // setSubmitError(true); TODO: A DECOMMENTER LORS DE L'IMPLEMENTATION DE LA GESTION D'ERREUR D'ENVOI
    } finally {
      setIsSubmitting(false);
    }
  }

  // state pour déclencher l'affichage des erreurs
  const [showErrors, setShowErrors] = useState(false);

  const steps = [ContentStep1, ContentStep2, ContentStep3, ContentStep4];

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentStep === 4) {
      sendFormData();
    } else {
      handleNextStep();
    }
  };

  const { mainTitle, subTitle, branding } = STEPS[currentStep - 1] || {};

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

  return (
    <div className="flex-1 py-4 px-8">
      <div className="h-full flex flex-col justify-between">
        <div className="w-46">
          <img src={logo} alt="logo mission locale" />
        </div>

        <div
          className={`${
            showErrors && currentStep === 1 ? "mb-6" : "mb-10"
          } text-center`}
        >
          {mainTitle && (
            <h2 className="text-3xl font-medium mb-2">{mainTitle}</h2>
          )}
          {subTitle && (
            <p className="text-xl font-light text-gray-600 mx-auto whitespace-pre-line">
              {subTitle}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
          <div className="flex-1 flex flex-col mx-auto">
            {steps.map((StepComponent, index) => {
              if (index + 1 === currentStep) {
                return (
                  <StepComponent
                    key={index}
                    currentStep={currentStep}
                    branding={branding}
                    showErrors={currentStep === 1 ? showErrors : false}
                  />
                );
              }
            })}
          </div>

          <div className="flex justify-between px-7">
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

            <div className="flex gap-4">
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
                  currentStep === 4 ? "Terminer inscription" : "Suivant"
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
        </form>
      </div>
    </div>
  );
}
