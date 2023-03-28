import { useQueryClient } from "@tanstack/react-query";

export const useInvalidateStatus = () => {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries(["status"]);
};
