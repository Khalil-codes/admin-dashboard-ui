import { ChangePage } from "@/hooks/usePagination";
import cn from "@/utils/cn";
import generatePagesArray from "@/utils/generatePageArray";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { ButtonHTMLAttributes, useEffect } from "react";
import { MdNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";

const PagePill = ({
  children,
  className,
  ...buttonProps
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={cn(
        "flex items-center rounded-md justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:dark:hover:border-gray-700 disabled:dark:hover:bg-gray-800 disabled:dark:hover:text-gray-400 disabled:hover:text-gray-500 disabled:hover:bg-white disabled:hover:border-gray-300",
        className
      )}
      {...buttonProps}>
      {children}
    </button>
  );
};

type Props = {
  changePage: ChangePage;
  currentPage: number;
  totalPages: number;
};

const Pagination = ({ changePage, currentPage, totalPages }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  useEffect(() => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    console.log(currentPage);

    if (currentPage === 1) {
      params.delete("page");
    } else {
      params.set("page", currentPage.toString());
    }
    const queryString = params.toString();
    console.log(queryString);
    router.push(queryString ? `${pathName}?${queryString}` : pathName, {
      scroll: false,
      shallow: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <div className="flex justify-end gap-5 items-center flex-col-reverse sm:flex-row">
      <span className="text-sm text-gray-700 dark:text-gray-400">
        Page{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {currentPage}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {totalPages}
        </span>
      </span>
      <div className="flex gap-2">
        <PagePill
          disabled={currentPage === 1}
          onClick={() => {
            changePage("first");
          }}>
          <PreviousButton />
          <PreviousButton />
        </PagePill>
        <PagePill
          disabled={currentPage === 1}
          onClick={() => {
            changePage("decrement");
          }}>
          <PreviousButton />
        </PagePill>
        {generatePagesArray(totalPages, currentPage).map((page, index) =>
          page ? (
            <PagePill
              disabled={page === currentPage}
              key={page}
              className={cn({
                "z-10 text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:bg-gray-700 dark:text-white disabled:opacity-1 disabled:pointer-events-none":
                  page === currentPage,
              })}
              onClick={() => {
                changePage("jumpto", page);
              }}>
              {page}
            </PagePill>
          ) : (
            <span key={index}>...</span>
          )
        )}
        <PagePill
          disabled={currentPage === totalPages}
          onClick={() => {
            changePage("increment");
          }}>
          <NextPage />
        </PagePill>
        <PagePill
          disabled={currentPage === totalPages}
          onClick={() => {
            changePage("last");
          }}>
          <NextPage />
          <NextPage />
        </PagePill>
      </div>
    </div>
  );
};

export default Pagination;

const PreviousButton = () => (
  <>
    <span className="sr-only">Previous</span>
    <svg
      className="w-2.5 h-2.5 rtl:rotate-180"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 6 10">
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M5 1 1 5l4 4"
      />
    </svg>
  </>
);

const NextPage = () => (
  <>
    <span className="sr-only">Next</span>
    <svg
      className="w-2.5 h-2.5 rtl:rotate-180"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 6 10">
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m1 9 4-4-4-4"
      />
    </svg>
  </>
);
