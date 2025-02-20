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
    <div className="flex gap-2">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
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
