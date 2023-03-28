import { ReactNode } from "react";
import classNames from "classnames";

type Props = {
  onClick: () => void;
  children: ReactNode;
  className?: string;
};

export function TagButton({ onClick, children, className }: Props) {
  return (
    <button
      className={classNames("my-1 mr-1 px-2", className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
