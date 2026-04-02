import { useState } from "react";
import Calendar from "@/components/planning/Calendar";
import EventPanel from "@/components/planning/eventPanel/EventPanel";
import { useQuery } from "@tanstack/react-query";
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
  const [viewingEvent, setViewingEvent] = useState(null);

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
            className={`h-full ${viewingEvent ? "w-5/7" : "w-full"}`}
          >
            <Box>
              <Calendar
                events={data}
                onEventClick={(e) => {
                  setViewingEvent(e.event);
                }}
                defaultDate={viewingEvent ? viewingEvent.start : undefined}
                key={viewingEvent == null}
              />
            </Box>
          </div>
          {viewingEvent && (
            <div id="sidePanel" className="relative w-2/7 h-full">
              <Box>
                <EventPanel
                  event={viewingEvent}
                  onClose={() => setEditState(null)}
                />
              </Box>
            </div>
          )}
        </main>
      );
    default:
      throw "Unknown status : " + status;
  }
}
