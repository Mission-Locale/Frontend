import StepIndicator from "./StepIndicator";

export default function SideBar({ currentStep, steps }) {

  return (
    <div className="w-80 text-white p-8 bg-brandBlue h-screen"> {/* TODO: Ajouter bonne couleur de fond selon le step */}

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Étape {currentStep}</h2>
        <p className="text-blue-100 text-md h-20">
            {steps[currentStep - 1].description}
        </p>
      </div>

      <div className="space-y-20">
        {steps.map((step, index) => (
          <StepIndicator 
            key={step.id} 
            step={step} 
            currentStep={currentStep}
            isLast={index === steps.length - 1}
          />
        ))}
      </div>

    </div>
  );
}