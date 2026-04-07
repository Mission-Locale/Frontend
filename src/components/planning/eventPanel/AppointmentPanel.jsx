import { useState } from "react";
import Button from "../../ui/Button";
import AppointmentEditPanel from "./AppointmentEditPanel";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import {
  cancelAppointment,
  getAppointment,
  updateAppointmentTime,
} from "@/utils/api";
import ConfirmationModal from "@/components/ui/ConfirmationModal";
import { formatEvent } from "@/utils/dateFormater";
import { differenceInMinutes } from "date-fns";
import LoadingFrame from "@/components/ui/LoadingFrame";
import ErrorFrame from "@/components/ui/ErrorFrame";

export default function AppointmentPanel({ event, onClose }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [modal, setModal] = useState(null);
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const appointmentId = event.extendedProps.appointment.appointment_id;
  const { status, data, error } = useQuery({
    queryKey: ["workshop/appointments", appointmentId],
    queryFn: () => getAppointment(appointmentId),
  });

  switch (status) {
    case "pending":
      return <LoadingFrame />;
    case "error":
      return <ErrorFrame error={error} />;
  }

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
          cancelAppointment(event.id)
            .then(() => {
              queryClient.invalidateQueries({
                queryKey: ["planning", user.id],
              });
              onClose();
            })
            .finally(() => setIsSending(false));
        }}
      />,
    );
  }

  function handleAppointmentEdit(startDateTime, duration) {
    setIsSending(true);
    updateAppointmentTime(appointmentId, startDateTime, duration)
      .then(() => {
        queryClient.invalidateQueries({
          queryKey: ["planning", user.id],
        });
        queryClient.invalidateQueries({
          queryKey: ["workshop/appointments", appointmentId],
        });
        setIsEditing(false);
      })
      .finally(() => setIsSending(false));
  }

  if (!isEditing) {
    const startTime = new Date(data.startTime);

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
              <span>{differenceInMinutes(data.endTime, startTime)}</span>
            </li>
          </ul>
          <hr className="border-gray-500 border -my-2" />
          <ul className="flex flex-col gap-2">
            {user.role != "JOB_SEEKER" && (
              <li>
                <b>Demandeur : </b>
                <span className="capitalize">
                  {data.job_seeker.user.last_name}{" "}
                  {data.job_seeker.user.first_name}
                </span>
              </li>
            )}
            {user.role != "ADVISOR" && (
              <li>
                <b>Conseiller : </b>
                <span className="capitalize">
                  {data.advisor.user.last_name} {data.advisor.user.first_name}
                </span>
              </li>
            )}
          </ul>
        </div>
        {user.role == "ADVISOR" && (
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
        )}
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
