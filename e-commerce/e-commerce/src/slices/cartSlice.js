import { createSlice } from "@reduxjs/toolkit";
import { cartApi } from "../apis/cartApi";

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: { cart: {} },
  reducers: {
    clearCart: (state) => {
      state.cart = {};
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      cartApi.endpoints.getCart.matchFulfilled,
      (state, { payload }) => {
        state.cart = payload;
      }
    );
    builder.addMatcher(
      cartApi.endpoints.checkoutCart.matchFulfilled,
      (state) => {
        state.cart = {};
      }
    );
    builder.addMatcher(
      cartApi.endpoints.increaseItem.matchFulfilled,
      (state, { payload }) => {
        const cart = Object.assign(state.cart);
        cart.items = cart.items.map((item) => {
          if (item.ci_id === payload.ci_id) {
            item.ci_count++;
            return item;
          }
          return item;
        });
        state.cart = cart;
      }
    );
    builder.addMatcher(
      cartApi.endpoints.removeItem.matchFulfilled,
      (state, { payload }) => {
        let cart = Object.assign(state.cart);
        cart.items = cart.items.filter((item) => item.ci_id !== payload.ci_id);
        if (!cart.items.length) cart = {};
        state.cart = cart;
      }
    );
    builder.addMatcher(
      cartApi.endpoints.decreaseItem.matchFulfilled,
      (state, { payload }) => {
        let cart = Object.assign(state.cart);
        cart.items = cart.items.map((item) => {
          if (item.ci_id === payload.ci_id) {
            item.ci_count--;
            return item;
          }
          return item;
        });
        cart.items = cart.items.filter((item) => item.ci_count);
        if (!cart.items.length) cart = {};
        state.cart = cart;
      }
    );
    builder.addMatcher(cartApi.endpoints.cancelCart.matchFulfilled, (state) => {
      state.cart = {};
    });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
