"use client";

import Delete from "@/components/Delete";
import Pagination from "@/components/Pagination";
import Search from "@/components/Search";
import Table from "@/components/Table";
import { RECORDS_PER_PAGE } from "@/constants";
import { useRoot } from "@/context";
import usePagination from "@/hooks/usePagination";
import { useSearchParams } from "next/navigation";
import { MdOutlineDelete } from "react-icons/md";

export default function Home() {
  const initialPage = Number(useSearchParams().get("page"));
  const { users, loading } = useRoot();
  const {
    paginatedData: paginatedUsers,
    changePage,
    currentPage,
    totalPages,
  } = usePagination(users, { perPage: RECORDS_PER_PAGE, initialPage });

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main>
      <div className="flex py-3 justify-between w-full gap-4">
        <Search className="w-full sm:w-1/2" />
        <Delete
          disabled={users.length === 0}
          outline
          onClick={() => console.log("Delete")}>
          <MdOutlineDelete />
        </Delete>
      </div>
      <div className="py-3 min-h-[745px]">
        <Table items={paginatedUsers} itemsPerPage={RECORDS_PER_PAGE} />
      </div>
      <div className="flex justify-between flex-col lg:flex-row gap-3 items-center">
        <span className="text-sm text-gray-700 dark:text-gray-400">
          <span className="font-semibold text-gray-900 dark:text-white">
            {0}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {46}
          </span>{" "}
          row(s) selected
        </span>
        <Pagination
          changePage={changePage}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </main>
  );
}
