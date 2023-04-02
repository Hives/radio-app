import { ChangeEvent } from "react";
import { setVolume } from "@/radio/radio";
import { VolumeButton } from "@/components/Status/Playing/VolumeButton";

type Props = {
  level: number;
};

export const Volume = ({ level }: Props) => (
  <div className="w-full">
    <div className="flex w-full gap-2">
      <VolumeButton disabled={level <= 0} onClick={() => setVolume(level - 1)}>
        -
      </VolumeButton>
      <input
        className="flex-grow"
        type="range"
        name="volume"
        min="0"
        max="100"
        value={level}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setVolume(parseInt(e.target.value))
        }
      />
      <VolumeButton disabled={level >= 100} onClick={() => setVolume(level + 1)}>
        +
      </VolumeButton>
    </div>
  </div>
);
