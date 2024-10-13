import { createSlice } from "@reduxjs/toolkit";

const contactInfoSlice = createSlice({
  name: "contactInfo",
  initialState: {
    info: null,
  },
  reducers: {
    setContactInfo: (state, action) => {
      state.info = action.payload;
    },
  },
});

export const { setContactInfo } = contactInfoSlice.actions;
export default contactInfoSlice.reducer;
