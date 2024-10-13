import { createSlice } from "@reduxjs/toolkit";

const attemptSlice = createSlice({
  name: "attempt",
  initialState: {
    attempts: [],
    currentAttempt: null,
  },
  reducers: {
    setAttempts: (state, action) => {
      state.attempts = action.payload;
    },
    addAttempt: (state, action) => {
      state.attempts.push(action.payload);
    },
    setCurrentAttempt: (state, action) => {
      state.currentAttempt = action.payload;
    },
  },
});

export const { setAttempts, addAttempt, setCurrentAttempt } =
  attemptSlice.actions;
export default attemptSlice.reducer;
