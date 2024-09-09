import api from "./api";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (form) => ({
        url: "users/users/login",
        method: "POST",
        body: form,
      }),
    }),
    register: builder.mutation({
      query: (form) => ({
        url: "users/users/register",
        method: "POST",
        body: form,
      }),
    }),
    closeAccount: builder.mutation({
      query: () => ({
        url: "users/users/closeaccount",
        method: "PUT",
      }),
    }),
    update: builder.mutation({
      query: (form) => ({
        url: "users/users/update",
        method: "PUT",
        body: form,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useCloseAccountMutation,
  useUpdateMutation,
} = userApi;
