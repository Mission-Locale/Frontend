import { useState } from "react";
import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/Form/InputText";
import JobSeekerSpan from "./JobSeekerSpan";
import { differenceInMinutes, parseISO } from "date-fns";
import { formatInput } from "@/utils/dateFormater";

export default function AppointmentEditPanel({
  event,
  onCancel,
  onValidation,
  errors = [],
}) {
  const appointment = event.extendedProps.appointment;

  const [isSending, setIsSending] = useState(false);
  const [startDateTime, setStartDateTime] = useState(() =>
    formatInput(new Date(appointment.startTime)),
  );
  const [duration, setDuration] = useState(() =>
    differenceInMinutes(appointment.endTime, appointment.startTime),
  );

  function handleValidation() {
    setIsSending(true);
    onValidation(startDateTime, duration);
    setIsSending(false);
  }

  return (
    <div className="flex flex-col justify-between size-full">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-center -mt-2">{event.title}</h2>
        <ul className="flex flex-col">
          <li>
            <TextInput
              label="Début"
              placeholder="Date et heure"
              required={true}
              disabled={isSending}
              type="datetime-local"
              value={formatInput(startDateTime)}
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
        <ul className="flex flex-col gap-2">
          <li>
            <b>Demandeur : </b>
            <JobSeekerSpan jobSeekerId={appointment.job_seeker_id} />
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
          onClick={() => {
            onCancel();
            setStartDateTime(event.startDate);
            setDuration(event.duration);
          }}
          disabled={isSending}
        />
      </div>
    </div>
  );
}
