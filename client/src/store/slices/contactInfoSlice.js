import { createSlice } from "@reduxjs/toolkit";

const contactInfoSlice = createSlice({
  name: "contactInfo",

  initialState: {
    info: null,
    error: null,
  },

  reducers: {
    setContactInfo: (state, action) => {
      state.info = action.payload;
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

export const { setContactInfo, setError, clearError } = contactInfoSlice.actions;
export default contactInfoSlice.reducer;
