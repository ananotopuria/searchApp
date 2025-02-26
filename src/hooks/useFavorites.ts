import { useState, useEffect } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoritePokemon');
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
  }, []);

  const saveToLocalStorage = (updatedFavorites: string[]) => {
    localStorage.setItem('favoritePokemon', JSON.stringify(updatedFavorites));
  };

  const addFavorite = (pokemonName: string) => {
    const updated = [...favorites, pokemonName];
    setFavorites(updated);
    saveToLocalStorage(updated);
  };

  const removeFavorite = (pokemonName: string) => {
    const updated = favorites.filter((name) => name !== pokemonName);
    setFavorites(updated);
    saveToLocalStorage(updated);
  };

  const isFavorite = (pokemonName: string) => favorites.includes(pokemonName);

  return { favorites, addFavorite, removeFavorite, isFavorite };
};
