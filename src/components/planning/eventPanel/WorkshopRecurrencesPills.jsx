import Pill from "@/components/ui/Pill";
import { getWorkshop } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { DayFormatter } from "@/utils/dateFormater";

const pillColors = [
  "brandBlue",
  "brandPink",
  "brandPurple",
  "brandOrange",
  "brandGreen",
];

export default function WorkshopRecurrencesPills({ workshopId }) {
  const { status, data, error } = useQuery({
    queryKey: ["workshop", workshopId],
    queryFn: () => getWorkshop(workshopId),
  });

  switch (status) {
    case "pending":
      return <span className="opacity-60"> Loading... </span>;
    case "error":
      return <span className="text-red-500"> {error.error} </span>;
    case "success":
      return (
        <div className="flex flex-row gap-1">
          {data.recurrences.map((recurrence, index) => (
            <Pill
              key={recurrence.workshop_recurrence_id}
              content={DayFormatter.format(recurrence.startDate)}
              theme={pillColors[index % pillColors.length]}
            />
          ))}
        </div>
      );
  }
}
