import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",

  initialState: {
    currentUser: null,
    error: null,
  },

  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
      state.error = null;
    },

    clearUser: (state) => {
      state.currentUser = null;
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

export const { setUser, clearUser, setError, clearError } = userSlice.actions;
export default userSlice.reducer;
