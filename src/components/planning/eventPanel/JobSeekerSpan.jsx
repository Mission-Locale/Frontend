import { getJobSeeker } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

export default function JobSeekerSpan({ jobSeekerId }) {
  const { status, data, error } = useQuery({
    queryKey: ["jobSeeker/user", jobSeekerId],
    queryFn: () => getJobSeeker(jobSeekerId),
  });

  switch (status) {
    case "error":
      return <span className="text-red-500"> {error.error} </span>;
    case "success":
      return (
        <span className="capitalize">
          {data.user.last_name} {data.user.first_name}
        </span>
      );
    case "pending":
      return <span className="opacity-60"> Loading... </span>;
  }
}
