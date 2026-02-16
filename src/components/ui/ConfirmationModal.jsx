import Modal from "@/components/Modal";
import Button from "@/components/ui/Button";

export default function ConfirmationModal({ modalKey, question, allowColor, onCancel, onAllow }) {
  return (
    <Modal modalKey={modalKey} onOutOfBoundClick={onCancel}>
      <div className="flex flex-col gap-4">
        <h3 className="font-bold">{question}</h3>
        <div className="flex flex-row gap-2">
          <Button
            text="Oui"
            variant="full"
            color={allowColor}
            size="md"
            radiusSize="lg"
            width="100%"
            onClick={onAllow}
          />
          <Button
            text="Non"
            variant="outline"
            color="brandBlue"
            size="md"
            radiusSize="lg"
            width="100%"
            onClick={onCancel}
          />
        </div>
      </div>
    </Modal>
  );
}
