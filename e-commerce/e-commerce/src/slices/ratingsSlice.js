import { createSlice } from "@reduxjs/toolkit";
import { ratingsApi } from "../apis/ratingsApi";

const ratingsSlice = createSlice({
  name: "ratingSlice",
  initialState: { ratings: [] },
  reducers: {
    clearRatings: (state) => {
      state.ratings = [];
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      ratingsApi.endpoints.showAllRatings.matchFulfilled,
      (state, { payload }) => {
        state.ratings = payload;
      }
    );
  },
});

export const { clearRatings } = ratingsSlice.actions;
export default ratingsSlice.reducer;
