import { useState } from "react";
import Calendar from "@/components/planning/Calendar";
import AppointmentAddPanel from "@/components/planning/eventPanel/AppointmentAddPanel";
import EventPanel from "@/components/planning/eventPanel/EventPanel";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSelfPlanning } from "@/utils/api";
import { useAuth } from "@/hooks/useAuth";
import ErrorFrame from "@/components/ui/ErrorFrame";
import LoadingFrame from "@/components/ui/LoadingFrame";
import Box from "@/components/ui/Box";

export default function PlanningPage() {
  const { user } = useAuth();
  const { status, data, error } = useQuery({
    queryKey: ["planning", user.id],
    queryFn: getSelfPlanning,
  });
  const queryClient = useQueryClient();

  const [editState, setEditState] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);

  function handleAppointmentCreation() {
    setEditState(null);
    queryClient.invalidateQueries({ queryKey: ["planning", user.id] });
  }

  switch (status) {
    case "pending":
      return (
        <div className="col-span-full row-span-full">
          <LoadingFrame />
        </div>
      );

    case "error":
      return (
        <div className="col-span-full row-span-full">
          <ErrorFrame error={error} />
        </div>
      );

    case "success":
      return (
        <main className="col-span-full row-span-full flex flex-row justify-between gap-4">
          <div
            id="calendar"
            className={`h-full ${editState ? "w-5/7" : "w-full"}`}
          >
            <Box>
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
                key={editState == null}
              />
            </Box>
          </div>
          {editState && (
            <div id="sidePanel" className="relative w-2/7 h-full">
              <Box>
                {editState == "editing" && editingEvent && (
                  <EventPanel
                    event={editingEvent}
                    onClose={() => setEditState(null)}
                  />
                )}
                {editState == "adding" && (
                  <AppointmentAddPanel
                    onCancel={() => setEditState(null)}
                    onValidation={handleAppointmentCreation}
                  />
                )}
              </Box>
            </div>
          )}
        </main>
      );
    default:
      throw "Unknown status : " + status;
  }
}
