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

  const filteredItems = (data?.results ?? []).filter((item: Item) =>
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
    <main className="p-4">
      <ThemeSelector />
      <Search onSearch={handleSearch} />

      {isLoading && <div className="loader">Loading...</div>}
      {error && (
        <p className="error">
          {'status' in error
            ? `Error: ${error.status}`
            : 'An unexpected error occurred.'}
        </p>
      )}

      <CardList
        items={filteredItems}
        selectedItems={selectedItems}
        onItemSelect={handleItemSelect}
        onItemUnselect={handleItemUnselect}
      />

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
