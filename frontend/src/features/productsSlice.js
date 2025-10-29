import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../services/api';
import { sampleProducts } from '../data/sampleProducts';

export const fetchProducts = createAsyncThunk('products/fetch', async (_, thunkAPI) => {
  try {
    const response = await api.get('/products');
    return response.data.products;
  } catch (error) {
    console.warn('API unavailable, using sample products');
    return sampleProducts;
  }
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: sampleProducts,
    status: 'idle',
    filters: {
      query: '',
      category: 'All',
      sort: 'featured'
    }
  },
  reducers: {
    setQuery: (state, action) => {
      state.filters.query = action.payload;
    },
    setCategory: (state, action) => {
      state.filters.category = action.payload;
    },
    setSort: (state, action) => {
      state.filters.sort = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'failed';
      });
  }
});

export const { setQuery, setCategory, setSort } = productsSlice.actions;
export default productsSlice.reducer;
