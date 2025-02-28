import { useState, useEffect } from "react";
import { PokemonDetails } from "../types/pokemon";

const API_BASE_URL = "https://pokeapi.co/api/v2";

export const usePokemonDetails = (items: { name: string; url: string }[]) => {
  const [pokemonDetails, setPokemonDetails] = useState<{ [key: string]: PokemonDetails & { generation?: string } }>({});

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      const newDetails: { [key: string]: PokemonDetails & { generation?: string } } = {};

      await Promise.all(
        items.map(async (item) => {
          try {
            const response = await fetch(`${API_BASE_URL}/pokemon/${item.name}`);
            const data: PokemonDetails = await response.json();

            const speciesResponse = await fetch(`${API_BASE_URL}/pokemon-species/${item.name}`);
            const speciesData = await speciesResponse.json();

            newDetails[item.name] = {
              ...data,
              generation: speciesData.generation.name, 
            };
          } catch (error) {
            console.error(`Error fetching details for ${item.name}:`, error);
          }
        })
      );

      setPokemonDetails(newDetails);
    };

    fetchPokemonDetails();
  }, [items]);

  return pokemonDetails;
};
