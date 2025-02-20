import React from 'react';
import { Item } from '../types/item';
import { usePokemonDetails } from '../hooks/usePokemonDetails';
import { PokemonDetails, PokemonType, PokemonAbility, PokemonStat } from '../types/pokemon';


interface CardListProps {
  items: Item[];
  selectedItems: Item[];
  onItemSelect: (item: Item) => void;
  onItemUnselect: (name: string) => void;
}

const CardList: React.FC<CardListProps> = ({
  items,
  selectedItems,
  onItemSelect,
  onItemUnselect,
}) => {
  const pokemonDetails = usePokemonDetails(items);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {items.map((item) => {
        const data = pokemonDetails[item.name] as PokemonDetails | null;
        const isSelected = selectedItems.some((selectedItem) => selectedItem.name === item.name);

        return (
          <div
            key={item.name}
            className={`border rounded-lg p-4 shadow hover:shadow-lg transition ${
              isSelected ? 'bg-green-100 border-green-500' : 'bg-white'
            }`}
          >
            {data ? (
              <>
                <img
                  src={data.sprites.other['official-artwork'].front_default}
                  alt={item.name}
                  className="w-32 h-32 mx-auto rounded-full shadow-lg"
                />
                <h2 className="text-center text-lg capitalize font-bold mt-2">{data.name}</h2>
                <p className="text-center text-gray-600">
                  Height: {data.height} | Weight: {data.weight}
                </p>

                <div className="mt-4">
                  <h3 className="font-semibold text-sm text-gray-700">Types:</h3>
                  <ul className="flex gap-2 mt-1">
                    {data.types.map((type: PokemonType) => (
                      <li key={type.type.name} className="px-2 py-1 bg-green-200 rounded">
                        {type.type.name}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4">
                  <h3 className="font-semibold text-sm text-gray-700">Abilities:</h3>
                  <ul className="mt-1">
                    {data.abilities.map((ability: PokemonAbility) => (
                      <li key={ability.ability.name} className="text-gray-700">
                        {ability.ability.name}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4">
                  <h3 className="font-semibold text-sm text-gray-700">Base Stats:</h3>
                  <ul className="mt-1">
                    {data.stats.map((stat: PokemonStat) => (
                      <li key={stat.stat.name} className="flex justify-between">
                        <span>{stat.stat.name}</span>
                        <span className="font-bold">{stat.base_stat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <label className="flex items-center justify-between mt-4">
                  <span className="capitalize text-sm font-medium">Select</span>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) =>
                      e.target.checked ? onItemSelect(item) : onItemUnselect(item.name)
                    }
                    className="w-5 h-5 text-blue-500"
                  />
                </label>
              </>
            ) : (
              <div className="text-center text-gray-500">Loading...</div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CardList;
