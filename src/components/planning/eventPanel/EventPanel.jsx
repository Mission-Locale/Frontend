import AppointmentPanel from "./AppointmentPanel";
import ActivityPanel from "./ActivityPanel";

export default function EventPanel({ event }) {
  switch (event.type) {
    case "appointment":
      return <AppointmentPanel event={event} />;
    case "activity":
      return <ActivityPanel event={event} />;
  }
}
