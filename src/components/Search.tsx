import cn from "@/utils/cn";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

type Props = {
  className?: string;
};

const Search = ({ className }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  return (
    <form
      className={cn("flex items-center", className)}
      onSubmit={(e) => {
        e.preventDefault();
        const params = new URLSearchParams(Array.from(searchParams.entries()));

        const search =
          new FormData(e.target as HTMLFormElement)
            .get("search")
            ?.toString()
            .trim() || "";

        if (!search) {
          params.delete("search");
        } else {
          params.set("search", search);
        }

        const queryParams = params.toString();

        router.push(queryParams ? `${pathName}?${queryParams}` : pathName, {
          shallow: true,
          scroll: false,
        });
      }}>
      <label htmlFor="simple-search" className="sr-only">
        Search
      </label>
      <input
        type="text"
        name="search"
        defaultValue={searchParams.get("search")?.trim() || ""}
        id="search"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-4 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Seach"
      />
      <button
        type="submit"
        className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg
          className="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20">
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
        <span className="sr-only">Search</span>
      </button>
    </form>
  );
};

export default Search;
