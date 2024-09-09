import { createSlice } from "@reduxjs/toolkit";
import { userApi } from "../apis/userApi";

const sign = (state, { payload }) => {
  state.user = payload.user;
  state.token = payload.token;
  window.sessionStorage.setItem("USER", JSON.stringify(payload.user));
  window.sessionStorage.setItem("TOKEN", JSON.stringify(payload.token));
};

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    user: window.sessionStorage.getItem("USER")
      ? JSON.parse(window.sessionStorage.getItem("USER"))
      : null,
    token: window.sessionStorage.getItem("TOKEN")
      ? JSON.parse(window.sessionStorage.getItem("TOKEN"))
      : null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      window.sessionStorage.removeItem("USER");
      window.sessionStorage.removeItem("TOKEN");
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(userApi.endpoints.login.matchFulfilled, sign);
    builder.addMatcher(userApi.endpoints.register.matchFulfilled, sign);
    builder.addMatcher(
      userApi.endpoints.update.matchFulfilled,
      (state, { payload }) => {
        state.user = payload;
        window.sessionStorage.setItem("USER", JSON.stringify(payload));
      }
    );
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
