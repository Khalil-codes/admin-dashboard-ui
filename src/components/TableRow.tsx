import { useRoot, useRootDispatch } from "@/context";
import { User } from "@/types/User";
import React, { useState } from "react";
import Delete from "./Delete";
import { MdOutlineDelete } from "react-icons/md";
import Checkbox from "./Checkbox";

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
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600/90">
      <td className="w-4 p-4">
        <Checkbox />
      </td>
      <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
        {item.name}
      </td>
      <td className="px-6 py-4">{item.email}</td>
      <td className="px-6 py-4">{item.role}</td>
      <td className="px-6 py-4 flex gap-3">
        <button>E</button>
        <Delete
          onClick={() => {
            dispatch({ type: "DELETE", payload: item.id });
          }}>
          <MdOutlineDelete />
        </Delete>
      </td>
    </tr>
  );
};

export default TableRow;

const TableEditRow = ({ item, index }: Props) => {
  return (
    <>
      <td className="py-3 px-2">{item.name}</td>
      <td className="py-3 px-2">{item.email}</td>
      <td className="py-3 px-2">{item.role}</td>
    </>
  );
};
