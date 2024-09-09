import api from "./api";

export const reviewsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: () => "reviews/reviews/all",
    }),
    newReview: builder.mutation({
      query: ({ id, review }) => ({
        url: `reviews/reviews/new/product/${id}`,
        method: "POST",
        body: { review },
      }),
    }),
    editReview: builder.mutation({
      query: ({ id, review }) => ({
        url: `reviews/reviews/update/review/${id}`,
        method: "PUT",
        body: { new_review: review },
      }),
    }),
    deleteReview: builder.mutation({
      query: ({ id }) => ({
        url: `reviews/reviews/delete/review/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useLazyGetReviewsQuery,
  useNewReviewMutation,
  useEditReviewMutation,
  useDeleteReviewMutation,
} = reviewsApi;
