import Modal from "@/components/Modal";
import Button from "@/components/ui/Button";

export default function ConfirmationModal({ modalKey, question, allowColor, onCancel, onAllow }) {
  return (
    <Modal modalKey={modalKey} onOutOfBoundClick={onCancel}>
      <div className="flex flex-col">
        <h3>{question}</h3>
        <div className="flex flex-row">
          <Button
            text="Oui"
            variant="full"
            color={allowColor}
            size="md"
            radiusSize="md"
            width="100%"
            onClick={onAllow}
          />
          <Button
            text="Non"
            variant="ghost"
            color="brandBlue"
            size="md"
            radiusSize="md"
            width="100%"
            onClick={onCancel}
          />
        </div>
      </div>
    </Modal>
  );
}
