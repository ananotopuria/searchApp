import React, { useState } from "react";

interface FilterOptions {
  type: string;
  ability: string;
  generation: string;
  sortByStat: string;
}

interface FilterProps {
  onFilterChange: (filters: FilterOptions) => void;
}

const pokemonTypes = [
  "bug", "dark", "dragon", "electric", "fairy", "fighting", "fire",
  "flying", "ghost", "grass", "ground", "ice", "normal", "poison",
  "psychic", "rock", "steel", "water"
];

const generations = [
  { label: "Generation 1", value: "1" },
  { label: "Generation 2", value: "2" },
  { label: "Generation 3", value: "3" },
  { label: "Generation 4", value: "4" },
  { label: "Generation 5", value: "5" },
  { label: "Generation 6", value: "6" },
  { label: "Generation 7", value: "7" },
  { label: "Generation 8", value: "8" },
  { label: "Generation 9", value: "9" }
];

const statOptions = ["hp", "attack", "defense", "special-attack", "special-defense", "speed"];

const FilterPanel: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FilterOptions>({
    type: "",
    ability: "",
    generation: "",
    sortByStat: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedFilters: FilterOptions = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="p-4 bg-gray-200 dark:bg-gray-800 rounded-lg">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">Filter Pokémon</h2>

      <label className="block text-gray-700 dark:text-gray-300 font-medium">Type:</label>
      <select name="type" value={filters.type} onChange={handleChange} className="w-full p-2 rounded bg-white dark:bg-gray-700">
        <option value="">All Types</option>
        {pokemonTypes.map((type) => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>

      <label className="block mt-3 text-gray-700 dark:text-gray-300 font-medium">Ability:</label>
      <input
        type="text"
        name="ability"
        value={filters.ability}
        onChange={handleChange}
        placeholder="Search ability"
        className="w-full p-2 rounded bg-white dark:bg-gray-700"
      />

      <label className="block mt-3 text-gray-700 dark:text-gray-300 font-medium">Generation:</label>
      <select name="generation" value={filters.generation} onChange={handleChange} className="w-full p-2 rounded bg-white dark:bg-gray-700">
        <option value="">All Generations</option>
        {generations.map((gen) => (
          <option key={gen.value} value={gen.value}>{gen.label}</option>
        ))}
      </select>

      <label className="block mt-3 text-gray-700 dark:text-gray-300 font-medium">Sort by Stat:</label>
      <select name="sortByStat" value={filters.sortByStat} onChange={handleChange} className="w-full p-2 rounded bg-white dark:bg-gray-700">
        <option value="">None</option>
        {statOptions.map((stat) => (
          <option key={stat} value={stat}>{stat}</option>
        ))}
      </select>
    </div>
  );
};

export default FilterPanel;
