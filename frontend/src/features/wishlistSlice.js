import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: []
  },
  reducers: {
    toggleWishlist: (state, action) => {
      const exists = state.items.find((item) => item._id === action.payload._id);
      if (exists) {
        state.items = state.items.filter((item) => item._id !== action.payload._id);
      } else {
        state.items.push(action.payload);
      }
    }
  }
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
