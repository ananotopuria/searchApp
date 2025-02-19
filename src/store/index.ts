import { configureStore } from '@reduxjs/toolkit';
import { pokemonApi } from '../services/pokemonApi';
import selectionReducer from './slices/selectionSlice';

export const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    selection: selectionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;