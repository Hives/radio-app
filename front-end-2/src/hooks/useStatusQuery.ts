import { getStatus, Status } from "@/radio/radio";
import { useQuery } from "@tanstack/react-query";

export const useStatusQuery = (initialStatus: Status) =>
  useQuery({
    queryKey: ["status"],
    queryFn: getStatus,
    initialData: initialStatus,
    refetchInterval: 1_000
  });
