import { useState } from "react";
import Button from "../../ui/Button";
import AppointmentEditPanel from "./AppointmentEditPanel";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { updateAppointment } from "@/utils/api";
import { formatDuration, intervalToDuration } from "date-fns";

export default function AppointmentPanel({ event }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [modal, setModal] = useState(null);
  const { user } = useAuth();
  const queryClient = useQueryClient();

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

  function handleAppointmentCancel() {
    setModal(
      <ConfirmationModal
        modalKey={"cancelConfirmation"}
        question="Êtes-vous sure de vouloir annuler le rendez-vous ?"
        allowColor="brandPink"
        onCancel={() => setModal(null)}
        onAllow={() => {
          setIsSending(true);
          setModal(null);
          updateAppointment(event.id, {
            state: "CANCELLED",
          });
          queryClient.invalidateQueries({
            queryKey: ["planning/advisor", user.id],
          });
          setIsSending(false);
        }}
      />,
    );
  }

  function handleAppointmentEdit(startDateTime, duration) {
    setIsSending(true);
    updateAppointment(event.id, {
      startDateTime: startDateTime,
      duration: duration,
    }); // TODO incoherence between backend update and expected frontend update
    queryClient.invalidateQueries({ queryKey: ["planning/advisor", user.id] });
    setIsSending(false);
    setIsEditing(false);
  }

  if (!isEditing)
    return (
      <>
        <h2>{event.title}</h2>
        <ul>
          <li>
            <b>Début : </b>
            <span>{event.start}</span>
          </li>
          <li>
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
        {modal}
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
