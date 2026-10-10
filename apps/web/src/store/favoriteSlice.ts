import { createSlice } from '@reduxjs/toolkit';

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState: [] as number[],
  reducers: {
    addFavorite: (state, action) => {
      const exists = state.includes(action.payload);
      if (!exists) {
        state.push(action.payload);
      }
    },
    removeFavorite: (state, action) => {
      return state.filter((id) => id !== action.payload);
    },
  },
});

export const { addFavorite, removeFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
