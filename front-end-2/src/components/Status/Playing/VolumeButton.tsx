import { ReactNode } from "react";
import { Button } from "@/components/Button";

type Props = {
  disabled: boolean;
  onClick: () => void;
  children: ReactNode;
};

export function VolumeButton({ disabled, onClick, children }: Props) {
  return (
    <Button className="w-6" disabled={disabled} onClick={onClick}>
      {children}
    </Button>
  );
}
