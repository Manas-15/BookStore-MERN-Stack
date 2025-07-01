// authSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.access_token;
    },
    clearAuth: (state) => {
      state.isAuthenticated = false;
      state.token = null;
    },
    resetStore: () => initialState
  }
});

export const { setAuth, clearAuth, resetStore } = authSlice.actions;
export default authSlice.reducer;
