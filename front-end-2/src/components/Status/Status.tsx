import { Status, stop } from "@/radio/radio";
import { useStatusQuery } from "@/hooks/useStatusQuery";
import { useInvalidateStatus } from "@/hooks/useInvalidateStatus";
import { Playing } from "@/components/Status/Playing/Playing";
import { NotPlaying } from "@/components/Status/NotPlaying.";

type Props = {
  initialStatus: Status;
};

export function Status({ initialStatus }: Props) {
  const statusQuery = useStatusQuery(initialStatus);
  const invalidateStatus = useInvalidateStatus();

  if (statusQuery.isError) return <h1>Oh no</h1>;

  const { data: status } = statusQuery;

  const stopAndRefresh = () => stop().then(invalidateStatus);

  return (
    <div className="h-full rounded-2xl bg-white p-4 shadow-md">
      {status.isPlaying ? (
        <Playing
          stationName={status.source.station.name}
          stationWebsite={status.source.station.website}
          volume={status.volume}
          stop={stopAndRefresh}
        />
      ) : (
        <NotPlaying />
      )}
    </div>
  );
}
