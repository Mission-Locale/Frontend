import { useState } from "react";
import Button from "../../ui/Button";
import AppointmentEditPanel from "./AppointmentEditPanel";

export default function AppointmentPanel({ event }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const jobSeeker = event.jobSeeker;

  function handleAppointmentCancel() {
    // TODO: Open Modal For Cancel Confirmation
  }

  function handleAppointmentEdit() {
    // TODO: Send datas to Backend
  }

  if (!isEditing)
    return (
      <>
        <h2>{event.title}</h2>
        <ul>
          <li>
            <b>Début : </b>
            <span>{event.startDate}</span>
          </li>
          <li>
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
            text="Modifier"
            color="brandBlue"
            width="100%"
            variant="full"
            size="md"
            radiusSize="rounded-lg"
            onClick={() => setIsEditing(true)}
            disabled={isSending}
          />
          <Button
            text="Annuler le Rendez-vous"
            color="brandPink"
            width="100%"
            variant="full"
            size="md"
            radiusSize="rounded-lg"
            onClick={handleAppointmentCancel}
            disabled={isSending}
          />
        </div>
      </>
    );
  else {
    return (
      <AppointmentEditPanel
        event={event}
        onValidation={handleAppointmentEdit}
        onCancel={() => setIsEditing(false)}
      />
    );
  }
}
