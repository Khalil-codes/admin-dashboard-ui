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
        "border border-solid border-gray-300 font-semibold min-w-[40px] text-xs rounded-lg p-1.5 hover:bg-gray-200 disabled:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed",
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
    <div className="flex justify-end gap-10 items-center">
      <span className="text-sm font-bold">
        Page {currentPage} of {totalPages}
      </span>
      <div className="flex gap-2">
        <PagePill
          disabled={currentPage === 1}
          onClick={() => {
            changePage("first");
          }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
            />
          </svg>
        </PagePill>
        <PagePill
          disabled={currentPage === 1}
          onClick={() => {
            changePage("decrement");
          }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </PagePill>
        {generatePagesArray(totalPages, currentPage).map((page, index) =>
          page ? (
            <PagePill
              disabled={page === currentPage}
              key={page}
              className={cn({
                "bg-sky-700/75 text-white disabled:opacity-1 disabled:bg-sky-700/75 disabled:pointer-events-none":
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </PagePill>
        <PagePill
          disabled={currentPage === totalPages}
          onClick={() => {
            changePage("last");
          }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
            />
          </svg>
        </PagePill>
      </div>
    </div>
  );
};

export default Pagination;
