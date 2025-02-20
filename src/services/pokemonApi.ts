import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemon: builder.query({
      query: ({ limit, offset }: { limit: number; offset: number }) =>
        `pokemon?limit=${limit}&offset=${offset}`,
    }),
  }),
});

export const { useGetPokemonQuery } = pokemonApi;