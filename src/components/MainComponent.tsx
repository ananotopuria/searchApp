import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetPokemonQuery } from '../services/pokemonApi';
import {
  selectItem,
  unselectItem,
  clearSelection,
} from '../store/slices/selectionSlice';
import { downloadSelectedItems } from '../utils/downloadCSV';
import CardList from './CardList';
import Search from './Search';
import Flyout from './Flyout';
import ThemeSelector from './ThemeSelector';
import { RootState } from '../store';
import { Item } from '../types/item';

const ITEMS_PER_PAGE = 10;

const MainComponent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectedItems = useSelector(
    (state: RootState) => state.selection.items,
  );

  const searchTerm = searchParams.get('q') ?? '';
  const currentPage = Number(searchParams.get('page')) || 1;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const { data, error, isLoading } = useGetPokemonQuery({
    limit: ITEMS_PER_PAGE,
    offset,
  });

  const filteredItems: Item[] = (data?.results ?? []).filter((item: Item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSearch = (newSearchTerm: string): void => {
    setSearchParams({ q: newSearchTerm, page: '1' });
    navigate(`/search?q=${newSearchTerm}&page=1`);
  };

  const handlePageChange = (newPage: number): void => {
    setSearchParams({ q: searchTerm, page: newPage.toString() });
    navigate(`/search?q=${searchTerm}&page=${newPage}`);
  };

  const handleUnselectAll = (): void => {
    dispatch(clearSelection());
  };

  const handleDownload = (): void => {
    downloadSelectedItems(selectedItems);
  };

  const handleItemSelect = (item: Item): void => {
    dispatch(selectItem(item));
  };

  const handleItemUnselect = (name: string): void => {
    dispatch(unselectItem(name));
  };

  return (
    <main className="max-w-6xl mx-auto p-4 space-y-8">
      {/* Header and Theme Selector */}
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Pokémon Search</h1>
        <ThemeSelector />
      </header>

      {/* Search Input */}
      <Search onSearch={handleSearch} />

      {/* Loading & Error States */}
      {isLoading && (
        <div className="text-center text-gray-500">Loading Pokémon...</div>
      )}
      {error && (
        <p className="text-red-500 text-center">
          {'status' in error
            ? `Error: ${error.status}`
            : 'An unexpected error occurred.'}
        </p>
      )}

      {/* Pokémon Cards */}
      <CardList
        items={filteredItems}
        selectedItems={selectedItems}
        onItemSelect={handleItemSelect}
        onItemUnselect={handleItemUnselect}
      />

      {/* Pagination Controls */}
      <div className="flex justify-center gap-4 items-center mt-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Prev
        </button>

        <span className="px-4 py-2 bg-blue-500 text-white rounded">
          Page {currentPage}
        </span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Next
        </button>
      </div>

      {/* Flyout for Selected Items */}
      {selectedItems.length > 0 && (
        <Flyout
          selectedCount={selectedItems.length}
          onUnselectAll={handleUnselectAll}
          onDownload={handleDownload}
        />
      )}
    </main>
  );
};

export default MainComponent;
