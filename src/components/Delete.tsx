import { useRootDispatch } from "@/context";
import cn from "@/utils/cn";
import React, { MouseEvent } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  outline?: boolean;
}

const DeleteButton = ({
  outline = false,
  className,
  children,
  ...props
}: Props) => {
  return (
    <button
      className={cn(
        "focus:outline-none text-center text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg px-3 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 disabled:cursor-not-allowed disabled:opacity-75 disabled:pointer-events-none",
        {
          "text-red-700 bg-transparent hover:text-white border border-red-700 hover:bg-red-800 focus:ring-red-300 dark:border-red-500 dark:bg-transparent dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900":
            outline,
        },
        className
      )}
      {...props}>
      {children}
    </button>
  );
};

export default DeleteButton;
