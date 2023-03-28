import { Station } from "@/radio/radio";
import { useMutateStation } from "@/hooks/useMutateStation";

type Props = {
  station: Station;
};

export function PlayStation({ station }: Props) {
  const mutateStation = useMutateStation();

  return (
    <button onClick={() => mutateStation.mutate(station.id)}>
      {station.name}
    </button>
  );
}
