import api from "./api.js";

export const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => `products/products/all`,
    }),
    getSingleProduct: builder.query({
      query: (id) => `products/products/single/${id}`,
    }),
    getSingleProductReviews: builder.query({
      query: (id) => `products/products/single/reviews/${id}`,
    }),
    getSingleProductRatings: builder.query({
      query: (id) => `products/products/single/ratings/${id}`,
    }),
    addToCart: builder.mutation({
      query: (id) => ({
        url: `products/produts/addcart/item/${id}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useLazyGetSingleProductRatingsQuery,
  useLazyGetSingleProductReviewsQuery,
  useAddToCartMutation,
} = productApi;
