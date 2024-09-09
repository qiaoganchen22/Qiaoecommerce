import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://e-commerce-rnms.onrender.com",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.token;
      headers.set("Content-Type", "application/json");
      token && headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),

  endpoints: () => ({}),
});

export default api;
