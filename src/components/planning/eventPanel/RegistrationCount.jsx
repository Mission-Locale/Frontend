import Pill from "@/components/ui/Pill";
import { getRegistrations } from "@/utils/api";

export default function RegistrationCount({ workshopRecurrenceId }) {
  const { status, data, error } = useQuery({
    queryKey: ["workshop/registrations", workshopRecurrenceId],
    queryFn: () => getRegistrations(workshopRecurrenceId),
  });

  switch (status) {
    case "error":
      return <span className="text-red-500"> {error.error} </span>;
    case "success":
      return (
        <>
          <Pill
            content={`${data.find((count) => count.state == "REGISTERED")._count} inscrits`}
            theme="brandGreen"
          />
          <Pill
            content={`${data.find((count) => count.state == "PENDING")._count} en liste d'attente`}
            theme="brandPink"
          />
        </>
      );
    case "pending":
      return <span className="opacity-60"> Loading... </span>;
  }
}
