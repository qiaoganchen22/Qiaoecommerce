import { createSlice } from "@reduxjs/toolkit";
import { reviewsApi } from "../apis/reviewsApi";

const reviewsSlice = createSlice({
  name: "reviewsSlice",
  initialState: { reviews: [] },
  reducers: {
    clearReviews: (state) => {
      state.reviews = [];
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      reviewsApi.endpoints.getReviews.matchFulfilled,
      (state, { payload }) => {
        state.reviews = payload;
      }
    );
  },
});

export const { clearReviews } = reviewsSlice.actions;
export default reviewsSlice.reducer;
