import { useRoot, useRootDispatch } from "@/context";
import { User } from "@/types/User";
import cn from "@/utils/cn";
import React, { useState } from "react";
import Delete from "./Delete";

type Props = {
  item: User;
  index: number;
};

const TableRow = ({ item, index }: Props) => {
  const { selectedUserIds } = useRoot();
  const dispatch = useRootDispatch();
  const handleCheck = () => dispatch({ type: "SELECT", payload: item.id });
  const [isEditMode, setIsEditMode] = useState(false);
  return (
    <tr className={cn("border-b border-b-gray-300")}>
      <td className="py-3 px-3 text-center">
        <input
          type="checkbox"
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
          value={item.id}
          onChange={handleCheck}
          checked={selectedUserIds.includes(item.id)}
        />
      </td>
      <td className="py-3 px-2">{item.name}</td>
      <td className="py-3 px-2">{item.email}</td>
      <td className="py-3 px-2">{item.role}</td>
      <td className="py-3 px-2 flex gap-3">
        <button>E</button>
        <Delete id={item.id} />
      </td>
    </tr>
  );
};

export default TableRow;
