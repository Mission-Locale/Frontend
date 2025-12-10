import ContentStep from "./ContentStep";
import SideBar from "../../components/RegisterUser/SideBar";

import { useState } from "react";

export default function RegisterUser() {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { id: 1, label: "Informations personnelles", description: "Renseignez vos informations personnelles." },
    { id: 2, label: "Informations complémentaires", description: "Fournissez des informations complémentaires." },
    { id: 3, label: "Documents", description: "Téléchargez vos documents pour aider le conseiller avant votre rendez-vous." },
    { id: 4, label: "Prise de rendez-vous", description: "Planifiez votre rendez-vous avec un conseiller." },
  ];

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleNext = () => {

    // Ici stocker les infos du step actuel, par exemple les documents uploadés
    // const formData = new FormData() ?

    setCurrentStep((prev) => Math.min(4, prev + 1));
  };

  return (

      <div className="flex">
        <SideBar currentStep={currentStep} steps={steps} />
        
        <ContentStep currentStep={currentStep} handleBack={handleBack} handleNext={handleNext} />
      </div>

  )
}
