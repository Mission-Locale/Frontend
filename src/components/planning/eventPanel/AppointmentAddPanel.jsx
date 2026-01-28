import { useState } from "react";
import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/Form/InputText";
import QueryInput from "@/components/ui/Form/QueryInput";
import { getAssignedJobSeekers } from "@/utils/api";

function getDefaultDate() {
  const date = new Date();
  date.setSeconds(0, 0);
  return date;
}

export default function AppointmentAddPanel({
  onCancel,
  onValidation,
  errors = [],
}) {
  const [isSending, setIsSending] = useState(false);
  const [startDateTime, setStartDateTime] = useState(getDefaultDate());
  const [duration, setDuration] = useState(60);

  const [jobSeeker, setJobSeeker] = useState("");
  const [jobSeekerId, setJobSeekerId] = useState(null);

  function handleInput(id, value) {
    setJobSeeker(value);
    setJobSeekerId(id);
  }

  function handleValidation() {
    setIsSending(true);
    onValidation(jobSeekerId, startDateTime, duration);
    setIsSending(false);
  }

  return (
    <>
      <h2>Création d'un rendez-vous</h2>
      <ul>
        <li>
          <TextInput
            label="Début"
            placeholder="Date et heure"
            required={true}
            disabled={isSending}
            type="datetime-local"
            value={startDateTime}
            onChange={(e) => setStartDateTime(e.currentTarget.valueAsDate)}
            ringColor="brandBlue"
            error={errors["startDateTime"]}
          />
        </li>
        <li>
          <TextInput
            label="Durée"
            placeholder="Durée en minutes"
            required={true}
            disabled={isSending}
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.currentTarget.value)}
            ringColor="brandBlue"
            error={errors["duration"]}
          />
        </li>
      </ul>
      <hr />
      <ul>
        <li>
          <QueryInput
            label="Demandeur"
            placeholder="NOM Prénom"
            selectTheme="brandBlue"
            value={jobSeeker}
            fetchKey="search/assignedJobSeekers"
            fetchfunction={getAssignedJobSeekers}
            optionMapper={(jobSeeker) => {
              return {
                value: jobSeeker.job_seeker_id,
                label: `${jobSeeker.lastName} ${jobSeeker.firstName}`,
              };
            }}
            onSelection={handleInput}
            required={true}
            disabled={isSending}
          />
        </li>
      </ul>
      <div className="flex flex-row">
        <Button
          text="Valider"
          color="brandBlue"
          width="100%"
          variant="full"
          size="md"
          radiusSize="rounded-lg"
          onClick={handleValidation}
          disabled={isSending}
        />
        <Button
          text="Annuler"
          color="brandOrange"
          width="100%"
          variant="outline"
          size="md"
          radiusSize="rounded-lg"
          onClick={onCancel}
          disabled={isSending}
        />
      </div>
    </>
  );
}
