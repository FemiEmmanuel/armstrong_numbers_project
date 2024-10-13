import { createSlice } from "@reduxjs/toolkit";

const feedbackSlice = createSlice({
  name: "feedback",
  initialState: {
    feedbacks: [],
  },
  reducers: {
    setFeedbacks: (state, action) => {
      state.feedbacks = action.payload;
    },
    addFeedback: (state, action) => {
      state.feedbacks.push(action.payload);
    },
  },
});

export const { setFeedbacks, addFeedback } = feedbackSlice.actions;
export default feedbackSlice.reducer;
