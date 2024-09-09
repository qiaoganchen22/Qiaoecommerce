import { createSlice } from "@reduxjs/toolkit";
import { messagesApi } from "../apis/messagesApi";

const messagesSlice = createSlice({
  name: "messagesSlice",
  initialState: { messages: [] },
  reducers: {
    clearMessages: (state) => {
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      messagesApi.endpoints.getMessages.matchFulfilled,
      (state, { payload }) => {
        state.messages = payload;
      }
    );
    builder.addMatcher(
      messagesApi.endpoints.readMessage.matchFulfilled,
      (state, { payload }) => {
        state.messages = state.messages.map((message) =>
          message.m_id === payload.m_id ? payload : message
        );
      }
    );
    builder.addMatcher(
      messagesApi.endpoints.removeMessage.matchFulfilled,
      (state, { payload }) => {
        state.messages = state.messages.filter(
          (message) => message.m_id !== payload.m_id
        );
      }
    );
  },
});

export const { clearMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
