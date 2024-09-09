import { createSlice } from "@reduxjs/toolkit";
import { ordersApi } from "../apis/ordersApi";

const ordersSlice = createSlice({
  name: "ordersSlice",
  initialState: { orders: [], items: [] },
  reducers: {
    clearOrders: (state) => {
      state.orders = [];
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      ordersApi.endpoints.getCompletedOrders.matchFulfilled,
      (state, { payload }) => {
        state.orders = payload;
      }
    );
    builder.addMatcher(
      ordersApi.endpoints.getCancelledOrders.matchFulfilled,
      (state, { payload }) => {
        state.orders = payload;
      }
    );
    builder.addMatcher(
      ordersApi.endpoints.getOrderDetails.matchFulfilled,
      (state, { payload }) => {
        state.items = payload;
      }
    );
    builder.addMatcher(
      ordersApi.endpoints.cancelOrder.matchFulfilled,
      (state, { payload }) => {
        state.orders = state.orders.filter(
          (order) => order.o_id !== payload.o_id
        );
      }
    );
  },
});
export const { clearOrders } = ordersSlice.actions;

export default ordersSlice.reducer;
