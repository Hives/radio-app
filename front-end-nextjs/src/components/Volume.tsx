import { ChangeEvent } from "react";
import { setVolume } from "@/radio/radio";

type Props = {
  level: number;
};

export const Volume = ({ level }: Props) => (
  <>
    <div>
      <label htmlFor="points">Volume: {level}</label>
    </div>
    <div>
      <button disabled={level <= 0} onClick={() => setVolume(level - 1)}>
        -
      </button>
      <input
        type="range"
        name="volume"
        min="0"
        max="100"
        value={level}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setVolume(parseInt(e.target.value))
        }
      />
      <button disabled={level >= 100} onClick={() => setVolume(level + 1)}>
        +
      </button>
    </div>
  </>
);
