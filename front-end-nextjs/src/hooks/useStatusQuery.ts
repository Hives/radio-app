import { useQuery } from "@tanstack/react-query";
import { getStatus, Status } from "@/radio/radio";

export const useStatusQuery = (initialStatus: Status) =>
  useQuery({
    queryKey: ["status"],
    queryFn: getStatus,
    initialData: initialStatus,
    refetchInterval: 1_000,
  });
