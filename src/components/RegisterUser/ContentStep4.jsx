import Button from "../ui/Button.jsx";
import logo from "/assets/img/Logo_Mission_Locale.webp";

export default function ContentStep4({ currentStep, handleBack, handleNext }) {
  return (
    <div className="h-full flex flex-col justify-between gap-4">
      <div className="w-46">
        <img src={logo} alt="" />
      </div>

      <div className="flex-1 flex flex-col min-w-[80%] mx-auto justify-center">
        <div className="border-2 border-dashed border-gray-300 rounded-lg h-full flex flex-col items-center justify-center">
          <p>Content 4</p>
          <p>Content 4</p>
          <p>Content 4</p>
          <p>Content 4</p>
          <p>Content 4</p>
          <p>Content 4</p>
          <p>Content 4</p>
        </div>
      </div>

      <div className="flex justify-center gap-40">
        <Button
          text="Retour"
          color="brandBlue"
          size="md"
          variant="outline"
          radiusSize="sm"
          width="full"
          onClick={() => handleBack()}
        />
        <Button
          text="Suivant"
          color="brandBlue"
          size="md"
          variant="full"
          radiusSize="sm"
          width="full"
          onClick={() => handleNext()}
        />
      </div>
    </div>
  );
}