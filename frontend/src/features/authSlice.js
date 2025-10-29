import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../services/api';

export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    const { data } = await api.post('/auth/login', credentials);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || { message: 'Login failed' });
  }
});

export const register = createAsyncThunk('auth/register', async (payload, thunkAPI) => {
  try {
    const { data } = await api.post('/auth/register', payload);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || { message: 'Registration failed' });
  }
});

const initialState = {
  user: null,
  status: 'idle',
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('xiapi-token');
    },
    setUserFromStorage: (state, action) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.status = 'succeeded';
        state.error = null;
        if (action.payload.token) {
          localStorage.setItem('xiapi-token', action.payload.token);
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Login failed';
      })
      .addCase(register.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Registration failed';
      });
  }
});

export const { logout, setUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
