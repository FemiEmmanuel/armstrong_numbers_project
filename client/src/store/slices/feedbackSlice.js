import { createSlice } from "@reduxjs/toolkit";

const feedbackSlice = createSlice({
  name: "feedback",

  initialState: {
    feedbacks: [],
    error: null,
  },

  reducers: {
    setFeedbacks: (state, action) => {
      state.feedbacks = action.payload;
      state.error = null;
    },

    addFeedback: (state, action) => {
      state.feedbacks.push(action.payload);
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

export const { setFeedbacks, addFeedback, setError, clearError } = feedbackSlice.actions;
export default feedbackSlice.reducer;
