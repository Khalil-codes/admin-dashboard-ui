import { useEffect, useState } from "react";

type Options = {
  perPage?: number;
  initialPage?: number;
};

export type ChangePage = (type: string, number?: number) => void;

const usePagination = <T extends unknown>(
  data: T[],
  { perPage = 10, initialPage = 1 }: Options
) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const totalPages = Math.ceil(data.length / perPage);
  const [paginatedData, setPaginatedData] = useState<T[]>([]);

  useEffect(() => {
    if (totalPages <= 1) {
      setPaginatedData(data);
      setCurrentPage(1);
    }

    setPaginatedData(
      data.slice((currentPage - 1) * perPage, currentPage * perPage)
    );
  }, [data, currentPage, perPage, totalPages]);

  const changePage = (type: string, number?: number) => {
    let newPage = currentPage;

    switch (type) {
      case "increment":
        newPage += 1;
        break;
      case "decrement":
        newPage -= 1;
        break;
      case "first":
        newPage = 1;
        break;
      case "last":
        newPage = totalPages;
        break;
      case "jumpto":
        newPage = number || 1;
        break;
      default:
        break;
    }

    if (newPage < 1 || newPage > totalPages) return;

    setPaginatedData(data.slice((newPage - 1) * perPage, newPage * perPage));
    setCurrentPage(newPage);
  };

  return { paginatedData, totalPages, changePage, currentPage };
};

export default usePagination;
