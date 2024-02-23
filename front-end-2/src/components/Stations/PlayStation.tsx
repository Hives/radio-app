import { Station } from "@/radio/radio";
import { useMutateStation } from "@/hooks/useMutateStation";
import { Button } from "@/components/Button";

type Props = {
  station: Station;
};

export function PlayStation({ station }: Props) {
  const mutateStation = useMutateStation();

  return (
    <Button
      className="flex h-16 w-full items-center justify-center rounded-xl"
      onClick={() => mutateStation.mutate(station.id)}
    >
      {station.name}
    </Button>
  );
}
