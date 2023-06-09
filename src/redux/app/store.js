import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "../features/api/apiSlice";
import authSlice from "../features/auth/authSlice";
import conversationSlice from "../features/conversation/conversationSlice";
import messageSlice from "../features/message/messageSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    conversation: conversationSlice,
    messages: messageSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
