import Modal from "@/components/Modal";
import Button from "@/components/ui/Button";
import QueryInput from "@/components/ui/Form/QueryInput";
import { getAssignedJobSeekers } from "@/utils/api";
import { useState } from "react";

export default function JobSeekerRegisteringModal({ onCancel, onValidation }) {
  const [jobSeeker, setJobSeeker] = useState("");
  const [jobSeekerId, setJobSeekerId] = useState(null);

  function handleInput(id, value) {
    setJobSeeker(value);
    setJobSeekerId(id);
  }

  return (
    <Modal modalKey={"userRegistering"} onOutOfBoundClick={onCancel}>
      <div className="flex flex-col">
        <QueryInput
          label="Demandeur à inscrire"
          placeholder="NOM Prénom"
          selectTheme="brandBlue"
          onSelection={handleInput}
          value={jobSeeker}
          required={true}
          fetchKey="search/assignedJobSeekers"
          fetchfunction={getAssignedJobSeekers}
          optionMapper={(jobSeeker) => {
            return {
              value: jobSeeker.job_seeker_id,
              label: `${jobSeeker.user.last_name} ${jobSeeker.user.first_name}`,
            };
          }}
        />
        <div className="flex flex-row">
          <Button
            text="Inscrire"
            variant="full"
            color="brandBlue"
            size="md"
            radiusSize="md"
            width="100%"
            onClick={() => onValidation(jobSeekerId)}
            disabled={jobSeekerId == null}
          />
          <Button
            text="Annuler"
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
