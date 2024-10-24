import { createSlice } from "@reduxjs/toolkit";

const attemptSlice = createSlice({
  name: "attempt",
  initialState: {
    attempts: [],
    currentPage: 1,
    nextPage: null,
    previousPage: null,
    totalPages: 1,
    error: null,
  },
  reducers: {
    setAttempts: (state, action) => {
      state.attempts = action.payload;
      state.error = null;
    },
    addAttempt: (state, action) => {
      const newAttempts = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];
      state.attempts = [...state.attempts, ...newAttempts];
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setNextPage: (state, action) => {
      state.nextPage = action.payload;
    },
    setPreviousPage: (state, action) => {
      state.previousPage = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
  },
});

export const {
  setAttempts,
  addAttempt,
  setCurrentPage,
  setNextPage,
  setPreviousPage,
  setTotalPages,
  setError,
  clearError,
} = attemptSlice.actions;

export default attemptSlice.reducer;
