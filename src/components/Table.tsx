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
    <table className="w-full border border-gray-200 rounded-md">
      <TableHeader />
      <tbody>
        {padArrayEnd(items, itemsPerPage, null).map((item, index) =>
          item ? (
            <TableRow item={item} key={index} index={index} />
          ) : (
            <tr
              className={cn("border-b border-b-gray-300 h-[60px]")}
              key={index}>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};

export default Table;
