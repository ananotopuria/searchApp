import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

interface SearchProps {
  onSearch: (term: string) => void;
}

const Search = ({ onSearch }: SearchProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearchTerm =
    searchParams.get('q') || localStorage.getItem('searchTerm') || '';
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  useEffect(() => {
    localStorage.setItem('searchTerm', searchTerm);
  }, [searchTerm]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    const trimmedSearch = searchTerm.trim();
    setSearchParams({ q: trimmedSearch });
    onSearch(trimmedSearch);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search Pokémon..."
        className="p-2 border border-gray-300 rounded w-full"
      />
      <button
        onClick={handleSearch}
        className="mt-2 p-2 bg-blue-500 text-white rounded"
      >
        Search
      </button>
    </div>
  );
};

export default Search;
