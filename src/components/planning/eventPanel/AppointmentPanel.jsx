import { useState } from "react";
import Button from "../../ui/Button";
import AppointmentEditPanel from "./AppointmentEditPanel";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { updateAppointment } from "@/utils/api";
import JobSeekerSpan from "./JobSeekerSpan";
import ConfirmationModal from "@/components/ui/ConfirmationModal";
import { formatEvent } from "@/utils/dateFormater";

export default function AppointmentPanel({ event, onClose }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [modal, setModal] = useState(null);
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const appointment = event.extendedProps.appointment;

  function handleAppointmentCancel() {
    setModal(
      <ConfirmationModal
        modalKey={"cancelConfirmation"}
        question="Êtes-vous sure de vouloir annuler ce rendez-vous ?"
        allowColor="brandPink"
        onCancel={() => setModal(null)}
        onAllow={() => {
          setIsSending(true);
          setModal(null);
          updateAppointment(event.id, {
            state: "CANCELLED",
          }).then(() => {
            queryClient.invalidateQueries({
              queryKey: ["planning", user.id],
            });
            onClose();
            setIsSending(false);
          });
        }}
      />,
    );
  }

  function handleAppointmentEdit(startDateTime, duration) {
    setIsSending(true);
    updateAppointment(appointment.id, {
      startDateTime: startDateTime,
      duration: duration,
    }); // TODO incoherence between backend update and expected frontend update
    queryClient.invalidateQueries({ queryKey: ["planning/advisor", user.id] });
    setIsSending(false);
    setIsEditing(false);
  }

  if (!isEditing) {
    const startTime = new Date(appointment.startTime);

    return (
      <div className="flex flex-col justify-between size-full">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-center -mt-2">{event.title}</h2>
          <ul className="flex flex-col gap-2">
            <li>
              <b>Début : </b>
              <span>{formatEvent(startTime)}</span>
            </li>
            <li>
              <b>Durée : </b>
              <span>{appointment.duration}</span>
            </li>
          </ul>
          <hr className="border-gray-500 border -my-2" />
          <ul className="flex flex-col gap-2">
            <li>
              <b>Demandeur : </b>
              <JobSeekerSpan jobSeekerId={appointment.job_seeker_id} />
            </li>
          </ul>
        </div>
        <div className="flex flex-row gap-2 -m-2">
          <Button
            text="Modifier"
            color="brandBlue"
            width="100%"
            variant="full"
            size="sm"
            radiusSize="lg"
            onClick={() => setIsEditing(true)}
            disabled={isSending}
          />
          <Button
            text="Annuler le Rendez-vous"
            color="brandPink"
            width="100%"
            variant="full"
            size="sm"
            radiusSize="lg"
            onClick={handleAppointmentCancel}
            disabled={isSending}
          />
        </div>
        {modal}
      </div>
    );
  } else {
    return (
      <AppointmentEditPanel
        event={event}
        onValidation={handleAppointmentEdit}
        onCancel={() => setIsEditing(false)}
      />
    );
  }
}
