import { useRootDispatch } from "@/context";
import React, { ChangeEvent, useState } from "react";
import Checkbox from "./Checkbox";

const tableHeadClasses = "px-6 py-3";

const TableHeader = () => {
  const dispatch = useRootDispatch();
  const [checked, setChecked] = useState(false);
  const handleCheckAll = (event: ChangeEvent<HTMLInputElement>) => {
    // dispatch({ type: "SELECT", payload: "all" });
    setChecked(event.target.checked);
  };
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="p-4">
          <Checkbox checked onChange={handleCheckAll} />
        </th>
        <th scope="col" className="px-6 py-3">
          Name
        </th>
        <th scope="col" className="px-6 py-3">
          Email
        </th>
        <th scope="col" className="px-6 py-3">
          Role
        </th>
        <th scope="col" className="px-6 py-3">
          Actions
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;
