import React from 'react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (newPage: number) => void;
}


const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => (
  <div className="flex justify-center gap-2 mt-4">
    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
    >
      Prev
    </button>

    <span className="px-4 py-2 bg-blue-500 text-white rounded">
      Page {currentPage} of {totalPages}
    </span>

    <button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage >= totalPages}
      className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
    >
      Next
    </button>
  </div>
);

export default Pagination;
