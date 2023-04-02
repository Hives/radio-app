import { ReactNode } from "react";
import classNames from "classnames";
import {Button} from "@/components/Button";

type Props = {
  onClick: () => void;
  children: ReactNode;
  className?: string;
};

export function TagButton({ onClick, children, className }: Props) {
  return (
    <button
      className={classNames("my-1 mr-2 py-2 px-4 font-bold rounded-md shadow-md", className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
