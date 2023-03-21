import { apiSlice } from "../api/apiSlice";

export const messageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // endpoints here
    getMessages: builder.query({
      query: (id) =>
        `/messages?conversationId=${id}&_sort=timestamp&_order=desc&_page=1&_limit=${process.env.REACT_APP_MESSAGE_PER_PAGE}`,
    }),
    addMessages: builder.mutation({
      query: (data) => ({
        url: `/messages`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const { useGetMessagesQuery } = messageApi;
