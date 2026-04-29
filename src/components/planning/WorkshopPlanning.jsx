import Calendar from "@/components/planning/Calendar";
import { useQuery } from "@tanstack/react-query";
import { getWorkshopPlanning } from "@/utils/api";
import ErrorFrame from "@/components/ui/ErrorFrame";
import LoadingFrame from "@/components/ui/LoadingFrame";
import { useNavigate } from "react-router";

export default function WorkshopPlanning({
  customButton = undefined,
  defaultDate = undefined,
  linkPrefix = undefined,
}) {
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
          onEventClick={
            linkPrefix
              ? (e) =>
                  navigate(
                    linkPrefix +
                      e.event.extendedProps.workshopReccurence
                        .workshop_recurrence_id,
                  )
              : undefined
          }
          customButton={customButton}
          defaultDate={defaultDate}
        />
      );
    default:
      throw "Unknown status : " + status;
  }
}
