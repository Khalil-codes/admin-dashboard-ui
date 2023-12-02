import React from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import { padArrayEnd } from "@/utils/helpers";
import cn from "@/utils/cn";
import { User } from "@/types/User";

type Props = {
  itemsPerPage: number;
  items: User[];
};

const Table = ({ items, itemsPerPage }: Props) => {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <TableHeader />
        <tbody>
          {padArrayEnd(items, itemsPerPage, null).map((item, index) =>
            item ? (
              <TableRow item={item} key={index} index={index} />
            ) : (
              <tr
                className="bg-white border-b h-[67px] dark:bg-gray-800 dark:border-gray-700"
                key={index}>
                <td className="px-6 py-4"></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
