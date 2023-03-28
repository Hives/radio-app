import {useMutation} from "@tanstack/react-query";
import {playStation} from "@/radio/radio";
import {useInvalidateStatus} from "@/hooks/useInvalidateStatus";

export const useMutateStation = () => {
  const invalidateStatus = useInvalidateStatus();
  return useMutation({
    mutationFn: playStation,
    onSuccess: invalidateStatus
  })
};
