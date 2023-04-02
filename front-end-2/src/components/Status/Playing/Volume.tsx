import { ChangeEvent, useEffect, useState } from "react";
import { setVolume as setServerVolume } from "@/radio/radio";
import { VolumeButton } from "@/components/Status/Playing/VolumeButton";

type Props = {
  level: number;
};

export const Volume = ({ level }: Props) => {
  const [localLevel, setLocalLevel] = useState(level);

  useEffect(() => {
    setServerVolume(localLevel);
  }, [localLevel]);

  return (
    <div className="w-full">
      <div className="flex w-full gap-2">
        <VolumeButton
          disabled={localLevel <= 0}
          onClick={() => setLocalLevel(localLevel - 1)}
        >
          -
        </VolumeButton>
        <input
          className="flex-grow"
          type="range"
          name="volume"
          min="0"
          max="100"
          value={localLevel}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setLocalLevel(parseInt(e.target.value))
          }
        />
        {localLevel}
        <VolumeButton
          disabled={localLevel >= 100}
          onClick={() => setLocalLevel(localLevel + 1)}
        >
          +
        </VolumeButton>
      </div>
    </div>
  );
};
