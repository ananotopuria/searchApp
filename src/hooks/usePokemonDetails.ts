import { useEffect, useState } from 'react';
import axios from 'axios';
import { Item } from '../types/item';
import { PokemonDetails } from '../types/pokemon';

export const usePokemonDetails = (items: Item[]) => {
  const [pokemonDetails, setPokemonDetails] = useState<{ [key: string]: PokemonDetails | null }>({});

  useEffect(() => {
    const fetchDetails = async () => {
      const details = await Promise.all(
        items.map(async (item) => {
          try {
            const response = await axios.get<PokemonDetails>(item.url);
            return { name: item.name, data: response.data };
          } catch (error) {
            console.error(`Error fetching details for ${item.name}:`, error);
            return { name: item.name, data: null };
          }
        })
      );

      const detailsMap = details.reduce((acc, curr) => {
        acc[curr.name] = curr.data;
        return acc;
      }, {} as { [key: string]: PokemonDetails | null });

      setPokemonDetails(detailsMap);
    };

    if (items.length) fetchDetails();
  }, [items]);

  return pokemonDetails;
};
