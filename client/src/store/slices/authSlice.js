import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({

  name: "auth",

  initialState: {
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    error: null,
  },

  reducers: {
    setCredentials: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      state.error = null;
    },

    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.error = null;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setCredentials, logout, setError, clearError } = authSlice.actions;
export default authSlice.reducer;
