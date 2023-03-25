import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setVolume, Status } from "@/radio/radio";

export const useMutateVolume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (level: number) => setVolume(level),
    onMutate: async (level: number) => {
      await queryClient.cancelQueries({ queryKey: ["status"] });

      const previousStatus = queryClient.getQueryData(["status"]);

      queryClient.setQueryData(["status"], (old: Status | undefined) => {
        return old ? { ...old, volume: level } : old;
      });

      return { previousStatus };
    },
    onError: (err, level, context) => {
      queryClient.setQueryData(["status"], context?.previousStatus);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["status"] });
    },
  });
};
