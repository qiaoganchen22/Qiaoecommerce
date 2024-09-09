import api from "./api";

export const ordersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCompletedOrders: builder.query({
      query: () => "orders/orders/complete",
    }),
    getCancelledOrders: builder.query({
      query: () => "orders/orders/cancel",
    }),
    getOrderDetails: builder.query({
      query: (id) => `orders/orders/order/details/${id}`,
    }),
    cancelOrder: builder.mutation({
      query: (id) => ({
        url: `orders/orders/order/cancel/${id}`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useLazyGetCompletedOrdersQuery,
  useLazyGetCancelledOrdersQuery,
  useGetOrderDetailsQuery,
  useCancelOrderMutation,
} = ordersApi;
