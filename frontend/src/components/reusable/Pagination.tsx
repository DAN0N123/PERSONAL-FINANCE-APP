import React from "react";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const CustomPagination = ({ currentPage, totalPages, onPageChange }: Props) => {
  const canGoBack = currentPage > 1;
  const canGoForward = currentPage < totalPages;

  const showMiddle = currentPage > 2 && currentPage < totalPages;

  return (
    <div className="flex gap-2 items-center">
      {/* Prev */}
      <button
        onClick={() => canGoBack && onPageChange(currentPage - 1)}
        disabled={!canGoBack}
        className="w-8 h-8 border rounded-md flex items-center justify-center"
      >
        ◀
      </button>

      {/* First page */}
      <button
        onClick={() => onPageChange(1)}
        className={`w-8 h-8 border rounded-md flex items-center justify-center ${
          currentPage === 1 ? "bg-black text-white" : ""
        }`}
      >
        1
      </button>

      {/* Show ellipsis only if current page > 3 */}
      {currentPage > 3 && (
        <span className="w-8 h-8 flex items-center justify-center">...</span>
      )}

      {/* Show current page if not first or last */}
      {showMiddle && (
        <button
          onClick={() => onPageChange(currentPage)}
          className="w-8 h-8 border rounded-md bg-black text-white flex items-center justify-center"
        >
          {currentPage}
        </button>
      )}

      {/* Show page before last if currentPage === totalPages - 1 */}
      {currentPage === totalPages - 1 && totalPages > 3 && (
        <button
          onClick={() => onPageChange(currentPage)}
          className="w-8 h-8 border rounded-md bg-black text-white flex items-center justify-center"
        >
          {currentPage}
        </button>
      )}

      {/* Ellipsis only if we're far from the last page */}
      {currentPage < totalPages - 2 && totalPages > 4 && (
        <span className="w-8 h-8 flex items-center justify-center">...</span>
      )}

      {/* Last page */}
      {totalPages > 1 && (
        <button
          onClick={() => onPageChange(totalPages)}
          className={`w-8 h-8 border rounded-md flex items-center justify-center ${
            currentPage === totalPages ? "bg-black text-white" : ""
          }`}
        >
          {totalPages}
        </button>
      )}

      {/* Next */}
      <button
        onClick={() => canGoForward && onPageChange(currentPage + 1)}
        disabled={!canGoForward}
        className="w-8 h-8 border rounded-md flex items-center justify-center"
      >
        ▶
      </button>
    </div>
  );
};

export default CustomPagination;
