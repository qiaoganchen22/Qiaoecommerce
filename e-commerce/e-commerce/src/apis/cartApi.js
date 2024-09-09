import api from "./api";

export const cartApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({ query: () => `cart/cart/getcart` }),
    increaseItem: builder.mutation({
      query: ({ id, i_id }) => ({
        url: `cart/cart/increase/cart/${id}/item/${i_id}`,
        method: "PUT",
      }),
    }),
    removeItem: builder.mutation({
      query: ({ id, i_id }) => ({
        url: `cart/cart/remove/cart/${id}/item/${i_id}`,
        method: "DELETE",
      }),
    }),
    decreaseItem: builder.mutation({
      query: ({ id, i_id }) => ({
        url: `cart/cart/decrease/cart/${id}/item/${i_id}`,
        method: "PUT",
      }),
    }),
    cancelCart: builder.mutation({
      query: (id) => ({
        url: `cart/cart/delete/${id}`,
        method: "DELETE",
      }),
    }),
    checkoutCart: builder.mutation({
      query: ({ id, card, address }) => ({
        url: `cart/cart/checkout/${id}`,
        method: "POST",
        body: { card, address },
      }),
    }),
  }),
});

export const {
  useGetCartQuery,
  useIncreaseItemMutation,
  useRemoveItemMutation,
  useDecreaseItemMutation,
  useCancelCartMutation,
  useCheckoutCartMutation,
} = cartApi;
