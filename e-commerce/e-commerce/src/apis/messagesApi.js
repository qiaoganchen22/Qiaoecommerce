import api from "./api";

export const messagesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => "messages/messages/all",
    }),
    readMessage: builder.mutation({
      query: (id) => ({ url: `messages/messages/seen/${id}`, method: "PUT" }),
    }),
    removeMessage: builder.mutation({
      query: (id) => ({
        url: `messages/messages/delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useLazyGetMessagesQuery,
  useReadMessageMutation,
  useRemoveMessageMutation,
} = messagesApi;
