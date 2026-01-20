import { useState } from "react";
import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/Form/InputText";
import { formatDuration, intervalToDuration } from "date-fns";
import { useQuery } from "@tanstack/react-query";

export default function AppointmentEditPanel({
  event,
  onCancel,
  onValidation,
  errors = [],
}) {
  const [isSending, setIsSending] = useState(false);
  const [startDateTime, setStartDateTime] = useState(event.startDate);
  const [duration, setDuration] = useState(event.duration);

  function handleValidation() {
    setIsSending(true);
    onValidation(startDateTime, duration);
    setIsSending(false);
  }

  const jobSeekerId = event.extendedProps.appointment.job_seeker_id;
  const { status, data, error } = useQuery({
    queryKey: ["jobSeeker/user", jobSeekerId],
    queryFn: () => getJobSeekerUser(jobSeekerId), // TODO: make endpoint
  });
  // TODO: verify classes
  let jobSeekerComponent;
  switch (status) {
    case "error":
      jobSeekerComponent = <span className="error"> {error} </span>;
      break;
    case "success":
      jobSeekerComponent = (
        <span>
          {data.lastName} {data.firstName}
        </span>
      );
      break;
    case "pending":
      jobSeekerComponent = <span className="transparent"> Loading... </span>;
      break;
  }

  return (
    <>
      <h2>{event.title}</h2>
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
          <b>Durée : </b>
          <span>
            {formatDuration(
              intervalToDuration({
                start: event.start,
                end: event.end,
              }),
            )}
          </span>
        </li>
      </ul>
      <hr />
      <ul>
        <li>
          <b>Demandeur : </b>
          {jobSeekerComponent}
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
          onClick={() => {
            onCancel();
            setStartDateTime(event.startDate);
            setDuration(event.duration);
          }}
          disabled={isSending}
        />
      </div>
    </>
  );
}
