import { useRootDispatch } from "@/context";
import cn from "@/utils/cn";
import React from "react";
import { MdOutlineDelete } from "react-icons/md";

type Props = {
  className?: string;
  id: string;
};

const Delete = ({ className, id }: Props) => {
  const dispatch = useRootDispatch();
  const handleDelete = () => {
    dispatch({ type: "DELETE", payload: id || "all" });
  };
  return (
    <button
      className={cn(
        "p-2 border bg-white text-red-500 border-gray-200 hover:bg-slate-50",
        {
          "bg-red-500 text-xl text-white rounded-md hover:bg-red-400":
            id === "all",
        },
        className
      )}
      onClick={handleDelete}>
      <MdOutlineDelete />
    </button>
  );
};

export default Delete;
