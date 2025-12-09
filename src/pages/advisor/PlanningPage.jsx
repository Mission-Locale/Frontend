import { useState } from "react";
import Calendar from "../../components/planning/Calendar";
import { useQuery } from "@tanstack/react-query";

export default function PlanningPage() {
  const { status, data, error } = useQuery({
    queryKey: ["advisorPlanning"],
    queryFn: getAdvisorPlanning,
  });
  const [editState, setEditState] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);

  switch (status) {
    case "pending":
      return <LoadingScreen />;

    case "error":
      return <ErrorScreen error={error} />;

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
            {editState == "adding" && <EventEditPanel />}
          </div>
        </main>
      );
    default:
      throw "Unknown status : " + status;
  }
}
