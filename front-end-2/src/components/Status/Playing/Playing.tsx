import { Volume } from "@/components/Status/Playing/Volume";
import { Button } from "@/components/Button";

type Props = {
  stationName: string;
  stationWebsite: string;
  volume: number;
  stop: () => void;
};

export function Playing({ stationName, stationWebsite, volume, stop }: Props) {
  return (
    <div className="flex h-full flex-col items-center justify-evenly gap-1 text-center">
      <h2 className="text-2xl font-bold text-green-700">{stationName}</h2>
      <a href={stationWebsite} target="_blank">
        {stationWebsite}
      </a>
      <Volume level={volume} />
      <Button className="inline px-6" onClick={stop}>
        Stop
      </Button>
    </div>
  );
}
