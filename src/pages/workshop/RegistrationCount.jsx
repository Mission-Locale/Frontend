import { useAuth } from "@/hooks/useAuth";
import { textColor } from "@/styles/tokensTailwind";
import { getRegistrations } from "@/utils/api";
import { ADMINISTRATOR, ADVISOR, JOB_SEEKER } from "@/utils/userRole";
import { useQuery } from "@tanstack/react-query";

export default function RegistrationCount({ workshopRecurrence }) {
  const { user } = useAuth();
  const { status, data, error } = useQuery({
    queryKey: [
      "workshop/registrations",
      workshopRecurrence.workshop_recurrence_id,
      user?.role,
    ],
    queryFn: () => getRegistrations(workshopRecurrence.workshop_recurrence_id),
  });

  switch (status) {
    case "error":
      return <span className="text-red-500"> {error.error} </span>;
    case "success":
      switch (user?.role) {
        case ADMINISTRATOR:
        case ADVISOR:
          return (
            <div className="flex flex-col xl:flex-row xl:gap-1 items-center">
              <p
                className={`${textColor.brandGreen} font-bold whitespace-nowrap`}
              >
                {data.filter(
                  (registration) => registration.state == "REGISTERED",
                ).length || 0}
                /{workshopRecurrence.maxOccupation} personnes inscrites
              </p>
              <p
                className={`${textColor.brandGreen} font-bold whitespace-nowrap`}
              >
                (
                {data.filter((registration) => registration.state == "PENDING")
                  .length || 0}{" "}
                en file d'attente)
              </p>
            </div>
          );
        case JOB_SEEKER:
        default:
          return (
            <div className="flex flex-col xl:flex-row xl:gap-1 items-center">
              <p
                className={`${textColor.brandGreen} font-bold whitespace-nowrap`}
              >
                {data.find((count) => count.state == "REGISTERED")?._count
                  ?.job_seeker_id || 0}
                /{workshopRecurrence.maxOccupation} personnes inscrites
              </p>
              <p
                className={`${textColor.brandGreen} font-bold whitespace-nowrap`}
              >
                (
                {data.find((count) => count.state == "PENDING")?._count
                  ?.job_seeker_id || 0}{" "}
                en file d'attente)
              </p>
            </div>
          );
      }

    case "pending":
      return <span className="opacity-60"> Loading... </span>;
  }
}
