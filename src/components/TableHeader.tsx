import { useRootDispatch } from "@/context";
import React, { ChangeEvent, useState } from "react";

const TableHeader = () => {
  const dispatch = useRootDispatch();
  const [checked, setChecked] = useState(false);
  const handleCheckAll = (event: ChangeEvent<HTMLInputElement>) => {
    // dispatch({ type: "SELECT", payload: "all" });
    setChecked(event.target.checked);
  };
  return (
    <thead className="border border-b-gray-300 text-neutral-700 ">
      <tr>
        <th className="py-3 px-3 text-center">
          <input
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
            value={"all"}
            onChange={handleCheckAll}
            checked={checked}
          />
        </th>
        <th className="py-3 px-2 text-start">Name</th>
        <th className="py-3 px-2 text-start">Email</th>
        <th className="py-3 px-2 text-start">Role</th>
        <th className="py-3 px-2 text-start" colSpan={2}>
          Actions
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;
