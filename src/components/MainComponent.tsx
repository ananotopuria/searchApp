import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CardList from './CardList';
import Search from './Search';

const ITEMS_PER_PAGE = 10;

const MainComponent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [results, setResults] = useState<{ name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchTerm = searchParams.get('q') || '';
  const currentPage = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const offset = (currentPage - 1) * ITEMS_PER_PAGE;
        const response = await axios.get<{ results: Array<{ name: string }> }>(
          `https://pokeapi.co/api/v2/pokemon?limit=${ITEMS_PER_PAGE}&offset=${offset}`
        );

        setResults(response.data.results);
      } catch (error) {
        console.error('API Request Failed:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const filteredResults = results.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (newSearchTerm: string) => {
    setSearchParams({ q: newSearchTerm, page: '1' });
    navigate(`/search?q=${newSearchTerm}&page=1`);
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({ q: searchTerm, page: newPage.toString() });
    navigate(`/search?q=${searchTerm}&page=${newPage}`);
  };

  return (
    <main className="p-4">
      <Search onSearch={handleSearch} />

      {isLoading && <div className="loader">Loading...</div>}
      {error && <p className="error">{error}</p>}

      <CardList items={filteredResults} />

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
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Next
        </button>
      </div>
    </main>
  );
};

export default MainComponent;
