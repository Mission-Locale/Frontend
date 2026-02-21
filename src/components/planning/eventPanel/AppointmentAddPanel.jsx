import { useState } from "react";
import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/Form/InputText";
import QueryInput from "@/components/ui/Form/QueryInput";
import { createAppointment, getAssignedJobSeekers } from "@/utils/api";
import InputText from "@/components/ui/Form/InputText";
import { lightFormat, parseISO } from "date-fns";

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
    createAppointment({
      startTime: startDateTime,
      duration: duration,
      job_seeker_id: jobSeekerId,
    })
      .then(onValidation)
      .finally(() => setIsSending(false));
  }

  return (
    <div className="flex flex-col justify-between size-full">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-center -mt-2">
          Création d'un rendez-vous
        </h2>
        <ul className="flex flex-col">
          <li>
            <InputText
              label="Début"
              placeholder="Date et heure"
              required={true}
              disabled={isSending}
              type="datetime-local"
              value={lightFormat(startDateTime, "yyyy-MM-dd'T'HH:mm:ss")}
              onChange={(e) =>
                setStartDateTime(
                  parseISO(e.currentTarget.value) || startDateTime,
                )
              }
              selectTheme="brandBlue"
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
              selectTheme="brandBlue"
              error={errors["duration"]}
            />
          </li>
        </ul>
        <hr className="border-gray-500 border -my-2" />
        <ul className="flex flex-col">
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
                  label: `${jobSeeker.user.last_name} ${jobSeeker.user.first_name}`,
                };
              }}
              onSelection={handleInput}
              required={true}
              disabled={isSending}
            />
          </li>
        </ul>
      </div>
      <div className="flex flex-row gap-2 -m-2">
        <Button
          text="Valider"
          color="brandBlue"
          width="100%"
          variant="full"
          size="sm"
          radiusSize="lg"
          onClick={handleValidation}
          disabled={isSending}
        />
        <Button
          text="Annuler"
          color="brandOrange"
          width="100%"
          variant="outline"
          size="sm"
          radiusSize="lg"
          onClick={onCancel}
          disabled={isSending}
        />
      </div>
    </div>
  );
}
