import { ReactNode } from "react";
import classNames from "classnames";

type Props = {
  disabled?: boolean;
  onClick: () => void;
  className?: string;
  children: ReactNode;
};

export function Button({ disabled, onClick, className, children }: Props) {
  return (
    <button
      className={classNames("rounded bg-green-600 text-white font-bold shadow-md px-2", className)}
      disabled={!!disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
