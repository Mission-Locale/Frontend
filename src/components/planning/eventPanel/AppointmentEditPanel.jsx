import { useState } from "react";
import Button from "../../ui/Button";
import TextInput from "../../ui/InputTextLabel";

export default function AppointmentPanel({ event, onCancel, onValidation }) {
  const [isSending, setIsSending] = useState(false);
  const [startDateTime, setStartDateTime] = useState(event.startDate);
  const [duration, setDuration] = useState(event.duration);

  function handleValidation() {
    setIsSending(true);
    onValidation(startDateTime, duration);
    setIsSending(false);
  }

  const jobSeeker = event.jobSeeker; //TODO: Get JobSeeker

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
          />
          <b>Durée : </b>
          <span>{event.duration}</span>
        </li>
      </ul>
      <hr />
      <ul>
        <li>
          <b>Demandeur : </b>
          <span>
            {jobSeeker.lastName} {jobSeeker.firstName}
          </span>
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
