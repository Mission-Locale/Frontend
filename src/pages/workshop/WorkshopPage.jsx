import { useAuth } from "@/hooks/useAuth";
import { getWorkshopRecurrence } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

export default function WorkshopPage() {
  const { id } = useParams();
  const { isAuthentificated, user } = useAuth();
  const { status, data, error } = useQuery({
    queryKey: ["workshop/recurrences", id],
    queryFn: getWorkshopRecurrence(id),
  });

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
      return <main className="col-span-full row-span-full"></main>;
    default:
      throw "Unknown status : " + status;
  }
}
