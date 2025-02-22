import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

interface SearchProps {
  onSearch: (term: string) => void;
}

const Search = ({ onSearch }: SearchProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(queryParam);

  useEffect(() => {
    setSearchTerm(queryParam);
  }, [queryParam]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    const trimmedSearch = searchTerm.trim();
    setSearchParams({ q: trimmedSearch });
    onSearch(trimmedSearch);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex gap-2">
      <label htmlFor="search" className="sr-only">Search Pokémon</label>
      <input
        id="search"
        name="search"
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Search Pokémon..."
        className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Search
      </button>
    </div>
  );
};

export default Search;
