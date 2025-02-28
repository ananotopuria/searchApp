import React, { useState } from "react";
import { Item } from "../types/item";
import { usePokemonDetails } from "../hooks/usePokemonDetails";
import { useFavorites } from "../hooks/useFavorites";
import { PokemonDetails, PokemonType, PokemonAbility, PokemonStat } from "../types/pokemon";
import FilterPanel from "./FilterPanel";

interface FilterOptions {
  type: string;
  ability: string;
  generation: string;
  sortByStat: string;
}

interface CardListProps {
  items: Item[];
  selectedItems: Item[];
  onItemSelect: (item: Item) => void;
  onItemUnselect: (name: string) => void;
}


const typeColors: Record<string, string> = {
  bug: 'bg-lime-500',
  dark: 'bg-gray-800',
  dragon: 'bg-indigo-600',
  electric: 'bg-yellow-400',
  fairy: 'bg-pink-400',
  fighting: 'bg-red-700',
  fire: 'bg-red-500',
  flying: 'bg-sky-300',
  ghost: 'bg-purple-600',
  grass: 'bg-green-500',
  ground: 'bg-yellow-600',
  ice: 'bg-cyan-300',
  normal: 'bg-gray-400',
  poison: 'bg-purple-500',
  psychic: 'bg-pink-500',
  rock: 'bg-yellow-700',
  steel: 'bg-gray-500',
  water: 'bg-blue-500',
};

const statIcons: Record<string, string> = {
  hp: '❤️',
  attack: '⚔️',
  defense: '🛡️',
  'special-attack': '🔮',
  'special-defense': '🧪',
  speed: '💨',
};

const statColors: Record<string, string> = {
  hp: 'bg-red-400',
  attack: 'bg-orange-400',
  defense: 'bg-yellow-400',
  'special-attack': 'bg-purple-400',
  'special-defense': 'bg-green-400',
  speed: 'bg-blue-400',
};

const CardList: React.FC<CardListProps> = ({ items, selectedItems }) => {
  const [filters, setFilters] = useState<FilterOptions>({
    type: "",
    ability: "",
    generation: "",
    sortByStat: "",
  });

  const pokemonDetails = usePokemonDetails(items);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const toggleFavorite = (pokemonName: string) => {
    if (isFavorite(pokemonName)) {
      removeFavorite(pokemonName);
    } else {
      addFavorite(pokemonName);
    }
  };
  

  const applyFilters = (pokemon: PokemonDetails | null) => {
    if (!pokemon) return false;

    if (filters.type && !pokemon.types.some((t) => t.type.name === filters.type)) return false;

    if (filters.ability && !pokemon.abilities.some((a) => a.ability.name.toLowerCase().includes(filters.ability.toLowerCase()))) return false;

    return true;
  };

  let filteredPokemons = Object.values(pokemonDetails).filter(applyFilters);

  if (filters.sortByStat) {
    filteredPokemons = [...filteredPokemons].sort((a, b) => {
      const aStat = a?.stats.find((s) => s.stat.name === filters.sortByStat)?.base_stat || 0;
      const bStat = b?.stats.find((s) => s.stat.name === filters.sortByStat)?.base_stat || 0;
      return bStat - aStat;
    });
  }

  return (
    <div>
      <FilterPanel onFilterChange={setFilters} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
        {filteredPokemons.map((data) => {
          if (!data) return null;

          const isSelected = selectedItems.some((selectedItem) => selectedItem.name === data.name);
          const favorite = isFavorite(data.name);

          return (
            <div
              key={data.name}
              className={`border rounded-lg p-4 shadow hover:shadow-lg transition relative ${
                isSelected ? "bg-gray-300 dark:bg-gray-600 border-gray-500" : "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              }`}
            >
              <button
                onClick={() => toggleFavorite(data.name)}
                className={`absolute top-2 right-2 text-2xl ${favorite ? "text-red-500" : "text-gray-400"} hover:scale-110 transition-transform`}
                aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
              >
                {favorite ? "💖" : "🤍"}
              </button>

              <h2 className="text-lg capitalize font-bold mt-2 text-center text-gray-900 dark:text-gray-100">{data.name}</h2>
              <img
                src={data.sprites.other["official-artwork"].front_default}
                alt={data.name}
                className="w-64 h-64 mx-auto border-8 border-black mt-2 bg-pokemonYellow dark:bg-gray-500"
              />
              <p className="text-center text-gray-600 dark:text-gray-300">Height: {data.height} | Weight: {data.weight}</p>

              {/* Types */}
              <div className="mt-4">
                <h3 className="font-semibold text-sm text-gray-700 dark:text-gray-200">Types:</h3>
                <ul className="flex gap-2 mt-1">
                  {data.types.map((type: PokemonType) => (
                    <li
                      key={type.type.name}
                      className={`px-2 py-1 rounded text-white capitalize ${
                        typeColors[type.type.name as keyof typeof typeColors] || 'bg-gray-300'
                      }`}
                    >
                      {type.type.name}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Abilities */}
              <div className="mt-4">
                <h3 className="font-semibold text-sm text-gray-700 dark:text-gray-200">Abilities:</h3>
                <ul className="flex gap-2 flex-wrap mt-1">
                  {data.abilities.map((ability: PokemonAbility) => (
                    <li key={ability.ability.name} className="px-2 py-1 rounded bg-pokemonRed text-white capitalize">
                      {ability.ability.name}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Base Stats */}
              <div className="mt-4">
                <h3 className="font-semibold text-sm text-gray-700 dark:text-gray-200">Base Stats:</h3>
                <ul className="mt-2 space-y-2">
                  {data.stats.map((stat: PokemonStat) => {
                    const color = statColors[stat.stat.name as keyof typeof statColors] || 'bg-gray-300';
                    const icon = statIcons[stat.stat.name as keyof typeof statIcons] || '✨';
                    const percentage = Math.min((stat.base_stat / 255) * 100, 100);

                    return (
                      <li key={stat.stat.name} className="text-gray-700 dark:text-gray-300 capitalize">
                        <div className="flex justify-between items-center mb-1">
                          <span className="flex items-center gap-1">
                            {icon} {stat.stat.name}
                          </span>
                          <span className="font-bold">{stat.base_stat}</span>
                        </div>
                        <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded">
                          <div className={`h-full rounded ${color}`} style={{ width: `${percentage}%` }}></div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardList;
