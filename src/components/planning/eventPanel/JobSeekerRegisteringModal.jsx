import Modal from "@/components/Modal";
import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/Form/InputText";
import { JOB_SEEKER } from "@/utils/userRole";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function JobSeekerRegisteringModal({ onCancel, onValidation }) {
  const [jobSeeker, setJobSeeker] = useState("");

  if (jobSeeker.length > 0) {
    const { status, data, error } = useQuery({
      queryKey: ["user/search/jobSeeker", jobSeeker],
      queryFn: () => searchUser(jobSeeker, JOB_SEEKER), // TODO: make endpoint
    });

    //TODO implement query result
    switch (status) {
      case "error":
        break;
      case "success":
        break;
      case "pending":
        break;
    }
  }

  return (
    <Modal modalKey={"userRegistering"} onOutOfBoundClick={onCancel}>
      <div className="flex flex-col">
        <TextInput
          label="Demandeur à inscrire"
          placeholder="NOM Prénom"
          type="text"
          selectTheme="brandBlue"
          onChange={(e) => setJobSeeker(e.currentTarget.value)}
          value={jobSeeker}
          required={true}
        />
        <div className="flex flex-row">
          <Button
            text="Oui"
            variant="full"
            color="brandBlue"
            size="md"
            radiusSize="md"
            width="100%"
            onClick={() => onValidation(jobSeeker)}
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
