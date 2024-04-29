export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const MAX_PAGES = 5;

  const calculateStart = () => {
    if (currentPage <= Math.floor(MAX_PAGES / 2)) {
      return 1;
    } else if (currentPage > totalPages - Math.floor(MAX_PAGES / 2)) {
      return totalPages - MAX_PAGES + 1;
    } else {
      return currentPage - Math.floor(MAX_PAGES / 2);
    }
  };

  const startPage = Math.max(calculateStart(), 1);
  const endPage = Math.min(startPage + MAX_PAGES - 1, totalPages);

  return (
    <div className="flex items-center justify-center space-x-2 my-4">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-4 py-2 text-sm text-gray-700 bg-white rounded-md dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
      >
        Prev
      </button>
      {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
        const pageNumber = startPage + index;
        return (
          <button
            key={pageNumber}
            className={`mx-1 px-4 py-2 text-sm rounded-md ${
              currentPage === pageNumber
                ? "text-white bg-blue-500 dark:bg-darkGrayishBlue"
                : "text-gray-700 bg-white dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        );
      })}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-4 py-2 text-sm text-gray-700 bg-white  rounded-md dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
      >
        Next
      </button>
    </div>
  );
}
