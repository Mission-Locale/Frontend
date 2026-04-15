import Calendar from "@/components/planning/Calendar";
import { useQuery } from "@tanstack/react-query";
import { getWorkshopPlanning } from "@/utils/api";
import ErrorFrame from "@/components/ui/ErrorFrame";
import LoadingFrame from "@/components/ui/LoadingFrame";
import { useNavigate } from "react-router";

export default function WorkshopPlanning() {
  const { status, data, error } = useQuery({
    queryKey: ["planning/workshop"],
    queryFn: getWorkshopPlanning,
  });
  const navigate = useNavigate();

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
        <Calendar
          events={data}
          onEventClick={(e) =>
            navigate(
              "/workshop/" +
                e.event.extendedProps.workshopReccurence.workshop_recurrence_id,
            )
          }
        />
      );
    default:
      throw "Unknown status : " + status;
  }
}
