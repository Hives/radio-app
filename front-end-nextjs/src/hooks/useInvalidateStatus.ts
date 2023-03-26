import { useQueryClient } from "@tanstack/react-query";

export const useInvalidateStatus = () => {
  const queryClient = useQueryClient();
  const invalidateStatus = () => queryClient.invalidateQueries(["status"]);

  return invalidateStatus;
};
