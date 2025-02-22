import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  useGetAllPokemonQuery,
  useGetPokemonQuery,
} from '../services/pokemonApi';
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

  const searchTerm = searchParams.get('q')?.toLowerCase().trim() ?? '';
  const currentPage = Number(searchParams.get('page')) || 1;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const { data: allPokemonData, isLoading: isAllPokemonLoading } =
    useGetAllPokemonQuery();

  const { data: paginatedData, isLoading: isPaginatedLoading } =
    useGetPokemonQuery({
      limit: ITEMS_PER_PAGE,
      offset,
    });

  const filteredItems: Item[] = searchTerm
    ? (allPokemonData?.results ?? []).filter((item: Item) =>
        item.name.toLowerCase().includes(searchTerm),
      )
    : (paginatedData?.results ?? []);

  const paginatedFilteredItems = filteredItems.slice(
    offset,
    offset + ITEMS_PER_PAGE,
  );
  const totalPages = Math.max(
    1,
    Math.ceil(filteredItems.length / ITEMS_PER_PAGE),
  );

  const handleSearch = (newSearchTerm: string): void => {
    setSearchParams({ q: newSearchTerm, page: '1' });
    navigate(`/search?q=${newSearchTerm}&page=1`);
  };

  const handlePageChange = (newPage: number): void => {
    setSearchParams({ q: searchTerm, page: newPage.toString() });
  };

  return (
    <main className="max-w-6xl mx-auto p-4 space-y-8">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Pokémon Search</h1>
        <ThemeSelector />
      </header>

      <Search onSearch={handleSearch} />

      {isAllPokemonLoading && !searchTerm && (
        <p className="text-center">Loading Pokémon...</p>
      )}
      {isPaginatedLoading && !searchTerm && (
        <p className="text-center">Loading page data...</p>
      )}

      <CardList
        items={paginatedFilteredItems}
        selectedItems={selectedItems}
        onItemSelect={(item) => dispatch(selectItem(item))}
        onItemUnselect={(name) => dispatch(unselectItem(name))}
      />
      {totalPages > 1 && (
        <div className="flex justify-center gap-4 items-center mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>

          <span className="px-4 py-2 bg-blue-500 text-white rounded">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {selectedItems.length > 0 && (
        <Flyout
          selectedCount={selectedItems.length}
          onUnselectAll={() => dispatch(clearSelection())}
          onDownload={() => downloadSelectedItems(selectedItems)}
        />
      )}
    </main>
  );
};

export default MainComponent;
