import Button from "../ui/Button.jsx";

export default function ContentStep3({ currentStep, handleBack, handleNext }) {
  return (
        <div>
            <p>Content 3</p>
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
  )
}