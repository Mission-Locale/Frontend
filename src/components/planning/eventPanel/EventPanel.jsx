import AppointmentPanel from "./AppointmentPanel";
import ActivityPanel from "./WorkshopRecurrencePanel";

export default function EventPanel({ event, onClose }) {
  switch (event.extendedProps.type) {
    case "APPOINTMENT":
      return <AppointmentPanel event={event} onClose={onClose} />;
    case "WORKSHOP_RECURRENCE":
      return <ActivityPanel event={event} onClose={onClose} />;
  }
}
