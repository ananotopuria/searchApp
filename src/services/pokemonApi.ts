import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PokemonListResponse, PokemonDetails } from '../types/pokemon';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getAllPokemon: builder.query<PokemonListResponse, void>({
      query: () => 'pokemon?limit=10000&offset=0',
    }),

    getPokemon: builder.query<
      PokemonListResponse,
      { limit: number; offset: number }
    >({
      query: ({ limit, offset }) => `pokemon?limit=${limit}&offset=${offset}`,
    }),

    getPokemonByName: builder.query<PokemonDetails, string>({
      query: (name) => `pokemon/${name.toLowerCase()}`,
    }),
  }),
});

export const {
  useGetAllPokemonQuery,
  useGetPokemonQuery,
  useGetPokemonByNameQuery,
} = pokemonApi;
