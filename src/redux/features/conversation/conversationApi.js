import { apiSlice } from "../api/apiSlice";
import { messageApi } from "../message/messageApi";

export const conversationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // endpoints here
    getConversations: builder.query({
      query: (email) =>
        `/conversations?participants_like=${email}&_sort=timestamp&_order=desc&_page=1&_limit=${process.env.REACT_APP_CONVERSATION_PER_PAGE}`,
    }),
    getConversation: builder.query({
      query: ({ email, participantEmail }) =>
        `/conversations?participants_like=${email}-${participantEmail}&&participants_like=${participantEmail}-${email}`,
    }),
    addConversation: builder.mutation({
      query: ({ sender, data }) => ({
        url: `/conversations`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const query = await queryFulfilled;
        console.log(arg, query, " => Line No: 22");
        //
      },
    }),
    editConversation: builder.mutation({
      query: ({ sender, id, data }) => ({
        url: `/conversations/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const query = await queryFulfilled;
        console.log(arg, " => Line No: 22");
        console.log(query, " => Line No: 22");
        //
      },
    }),
  }),
});
export const {
  useGetConversationsQuery,
  useGetConversationQuery,
  useAddConversationMutation,
  useEditConversationMutation,
} = conversationApi;
