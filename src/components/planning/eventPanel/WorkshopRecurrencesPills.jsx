import Pill from "@/components/ui/Pill";
import { getWorkshopRecurrences } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { DayFormatter } from "@/utils/dateFormater";
import { useNavigate } from "react-router";

const pillColors = [
  "brandBlue",
  "brandPink",
  "brandPurple",
  "brandOrange",
  "brandGreen",
];

export default function WorkshopRecurrencesPills({ workshopId, size = "sm" }) {
  const from = Date.now();
  const navigate = useNavigate();
  const { status, data, error } = useQuery({
    queryKey: ["workshops", workshopId, from],
    queryFn: () => getWorkshopRecurrences(workshopId, from),
  });

  switch (status) {
    case "pending":
      return <span className="opacity-60"> Loading... </span>;
    case "error":
      return <span className="text-red-500"> {error.error} </span>;
    case "success":
      if (data.length == 0)
        return <p className="pl-4">Aucune session planifié</p>;
      else
        return (
          <div className="flex flex-row gap-1 flex-wrap">
            {data.map((recurrence, index) => (
              <Pill
                key={recurrence.workshop_recurrence_id}
                content={DayFormatter.format(recurrence.startDate)}
                theme={pillColors[index % pillColors.length]}
                size={size}
                onClick={() =>
                  navigate("/workshop/" + recurrence.workshop_recurrence_id)
                }
              />
            ))}
          </div>
        );
  }
}
