import api from "./api";

export const ratingsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    showAllRatings: builder.query({
      query: () => `ratings/ratings/all`,
    }),
    deleteRating: builder.mutation({
      query: (id) => ({
        url: `ratings/ratings/delete/rating/${id}`,
        method: "DELETE",
      }),
    }),
    updateRating: builder.mutation({
      query: ({ id, rating_score }) => ({
        url: `ratings/ratings/update/rating/${id}`,
        method: "PUT",
        body: { rating_score },
      }),
    }),
    newRating: builder.mutation({
      query: ({ id, rating_score }) => ({
        url: `ratings/ratings/new/product/${id}`,
        method: "POST",
        body: { rating_score },
      }),
    }),
  }),
});

export const {
  useLazyShowAllRatingsQuery,
  useDeleteRatingMutation,
  useUpdateRatingMutation,
  useNewRatingMutation,
} = ratingsApi;
