import cn from "@/utils/cn";
import React, { InputHTMLAttributes } from "react";

const Checkbox = ({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className="flex items-center">
      <input
        id="checkbox-all-search"
        type="checkbox"
        className={cn(
          "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600",
          className
        )}
        {...props}
      />
      <label htmlFor="checkbox-all-search" className="sr-only">
        Check
      </label>
    </div>
  );
};

export default Checkbox;
