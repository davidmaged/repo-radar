import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favoriteSlice';

const STORAGE_KEY = 'favoriteRepos';

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
  preloadedState: {
    favorites: JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'),
  },
});

let prevFavorites = store.getState().favorites;
store.subscribe(() => {
  const favorites = store.getState().favorites;
  if (favorites === prevFavorites) return;
  prevFavorites = favorites;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
});

export default store;
