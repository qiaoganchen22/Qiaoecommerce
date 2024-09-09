import { createSlice } from "@reduxjs/toolkit";
import { productApi } from "../apis/productApi";
import { reviewsApi } from "../apis/reviewsApi";
import { ratingsApi } from "../apis/ratingsApi";

const productSlice = createSlice({
  name: "productSlice",
  initialState: { products: [], product: null, reviews: [], ratings: null },
  extraReducers: (builder) => {
    builder.addMatcher(
      ratingsApi.endpoints.newRating.matchFulfilled,
      (state, { payload }) => {
        const ratings = Object.assign(state.ratings);
        ratings.ratings.push(payload);

        let sum = 0;
        for (let x of ratings.ratings) sum += x.r_rating;
        ratings.ratings.length ? (sum /= ratings.ratings.length) : (sum = 0);
        ratings.avgRating = Number(sum.toFixed(2)) || 0;
        state.ratings = ratings;
      }
    );
    builder.addMatcher(
      ratingsApi.endpoints.deleteRating.matchFulfilled,
      (state, { payload }) => {
        const ratings = Object.assign(state.ratings);
        ratings.ratings = ratings.ratings.filter(
          (rating) => rating.r_id !== payload.r_id
        );

        let sum = 0;
        for (let x of ratings.ratings) sum += x.r_rating;
        ratings.ratings.length ? (sum /= ratings.ratings.length) : (sum = 0);
        ratings.avgRating = Number(sum.toFixed(2)) || 0;
        state.ratings = ratings;
      }
    );
    builder.addMatcher(
      ratingsApi.endpoints.updateRating.matchFulfilled,
      (state, { payload }) => {
        const ratings = Object.assign(state.ratings);
        ratings.ratings = ratings.ratings.map((rating) => {
          if (rating.r_id === payload.r_id) {
            rating.r_rating = payload.r_rating;
            return rating;
          }
          return rating;
        });
        let sum = 0;
        for (let x of ratings.ratings) sum += x.r_rating;
        ratings.ratings.length ? (sum /= ratings.ratings.length) : (sum = 0);
        ratings.avgRating = Number(sum.toFixed(2)) || 0;
        state.ratings = ratings;
      }
    );
    builder.addMatcher(
      productApi.endpoints.getAllProducts.matchFulfilled,
      (state, { payload }) => {
        state.products = payload;
      }
    );
    builder.addMatcher(
      productApi.endpoints.getSingleProduct.matchFulfilled,
      (state, { payload }) => {
        state.product = payload;
      }
    );
    builder.addMatcher(
      productApi.endpoints.getSingleProductRatings.matchFulfilled,
      (state, { payload }) => {
        state.ratings = payload;
      }
    );
    builder.addMatcher(
      productApi.endpoints.getSingleProductReviews.matchFulfilled,
      (state, { payload }) => {
        {
          state.reviews = payload;
        }
      }
    );
    builder.addMatcher(
      reviewsApi.endpoints.newReview.matchFulfilled,
      (state, { payload }) => {
        state.reviews = [payload].concat(state.reviews);
      }
    );
    builder.addMatcher(
      reviewsApi.endpoints.editReview.matchFulfilled,
      (state, { payload }) => {
        state.reviews = state.reviews.map((review) =>
          payload.r_id === review.r_id ? payload : review
        );
      }
    );
    builder.addMatcher(
      reviewsApi.endpoints.deleteReview.matchFulfilled,
      (state, { payload }) => {
        state.reviews = state.reviews.map((review) => {
          if (review.r_id === payload.r_id) {
            review.r_deleted = true;
            return review;
          }
          return review;
        });
      }
    );
  },
});

export default productSlice.reducer;
