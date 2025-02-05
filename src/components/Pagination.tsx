import { useNavigate, useParams } from 'react-router-dom';

const Pagination = ({ totalPages }: { totalPages: number }) => {
  const { page } = useParams();
  const navigate = useNavigate();
  const currentPage = Number(page) || 1;

  const handlePageChange = (newPage: number) => {
    navigate(`/search/${newPage}`);
  };

  return (
    <div className="flex justify-center gap-2 mt-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        Prev
      </button>

      <span className="px-4 py-2 bg-blue-500 text-white rounded">
        Page {currentPage}
      </span>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
