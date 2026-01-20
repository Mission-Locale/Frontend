import { useState } from "react";
import Calendar from "../../components/planning/Calendar";
import { useQuery } from "@tanstack/react-query";
import { getAdvisorPlanning } from "../../utils/api";
import { useAuth } from "@/hooks/useAuth";

export default function PlanningPage() {
  const { user } = useAuth();
  const { status, data, error } = useQuery({
    queryKey: ["planning/advisor", user.id],
    queryFn: () => getAdvisorPlanning(user.id),
  });
  const [editState, setEditState] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);

  switch (status) {
    case "pending":
      return <LoadingFrame />; //TODO implement LoadingFrame

    case "error":
      return <ErrorFrame error={error} />; //TODO implement ErrorFrame

    case "success":
      return (
        <main>
          <div id="calendar">
            <Calendar
              events={data}
              onEventClick={(e) => {
                setEditState("editing");
                setEditingEvent(e.event);
              }}
              customButton={{
                text: "Programmez un rendez-vous",
                click: function () {
                  setEditState("adding");
                },
              }}
            />
          </div>
          <div id="sidePanel">
            {editState == "editing" && editingEvent && (
              <EventPanel event={editingEvent} />
            )}
            {
              editState == "adding" && (
                <AppointmentAddPanel /> // TODO: implement appointment creation
              )
            }
          </div>
        </main>
      );
    default:
      throw "Unknown status : " + status;
  }
}
