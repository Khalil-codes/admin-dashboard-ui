const generatePagesArray = (totalPages: number, currentPage: number) => {
  if (totalPages <= 5)
    return Array.from({ length: totalPages }, (_, i) => i + 1);

  const pageNumbers = [];
  const visiblePageCount = 3; // Adjust this value to change the number of visible pages

  let startPage = Math.max(1, currentPage - Math.floor(visiblePageCount / 2));
  let endPage = Math.min(startPage + visiblePageCount - 1, totalPages);

  if (totalPages - endPage < Math.floor(visiblePageCount / 2)) {
    startPage = Math.max(
      1,
      startPage - (Math.floor(visiblePageCount / 2) - (totalPages - endPage))
    );
  }

  if (startPage > 1) {
    pageNumbers.push(1);
    if (startPage > 2) {
      pageNumbers.push(null);
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      pageNumbers.push(null);
    }
    pageNumbers.push(totalPages);
  }
  return pageNumbers;
};

export default generatePagesArray;
