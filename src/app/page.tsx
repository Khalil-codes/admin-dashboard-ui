"use client";

import Delete from "@/components/Delete";
import Pagination from "@/components/Pagination";
import Search from "@/components/Search";
import Table from "@/components/Table";
import { RECORDS_PER_PAGE } from "@/constants";
import { useRoot } from "@/context";
import usePagination from "@/hooks/usePagination";
import { useSearchParams } from "next/navigation";

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
    <main className="flex min-h-screen flex-col p-24">
      <div className="flex py-3 justify-between w-full gap-4">
        <Search className="w-1/2" />
        {users.length > 0 && <Delete id="all" />}
      </div>
      <div className="py-3">
        <Table items={paginatedUsers} itemsPerPage={RECORDS_PER_PAGE} />
      </div>
      <div className="flex justify-between items-center">
        <div className="">
          <span className="text-gray-500">0 of 46 row(s) selected</span>
        </div>
        <Pagination
          changePage={changePage}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </main>
  );
}
