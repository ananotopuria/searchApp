import { useFavorites } from '../hooks/useFavorites';
import { Item } from '../types/item';
import CardList from '../components/CardList';

const FavoritesPage = () => {
  const { favorites } = useFavorites();

  const favoriteItems: Item[] = favorites.map((name) => ({
    name,
    url: `https://pokeapi.co/api/v2/pokemon/${name}`,
  }));

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">💖 Favorite Pokémon</h1>
      {favorites.length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        <CardList
          items={favoriteItems}
          selectedItems={[]} 
          onItemSelect={() => {}}
          onItemUnselect={() => {}}
        />
      )}
    </div>
  );
};

export default FavoritesPage;
