import { configureStore } from "@reduxjs/toolkit";
import productSliceReducer from "../slices/productSlice.js";
import userSliceReducer from "../slices/userSlice.js";
import reviewsSliceReducer from "../slices/reviewsSlice.js";
import ordersSliceReducer from "../slices/ordersSlice.js";
import ratingsSliceReducer from "../slices/ratingsSlice.js";
import messagesSliceReducer from "../slices/messagesSlice.js";
import api from "../apis/api.js";
import cartSliceReducer from "../slices/cartSlice.js";

export const store = configureStore({
  reducer: {
    products: productSliceReducer,
    user: userSliceReducer,
    reviews: reviewsSliceReducer,
    ratings: ratingsSliceReducer,
    orders: ordersSliceReducer,
    messages: messagesSliceReducer,
    cart: cartSliceReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
