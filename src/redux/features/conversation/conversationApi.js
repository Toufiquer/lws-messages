import { apiSlice } from "../api/apiSlice";
import { messageApi } from "../message/messageApi";
const createObject = (arg, query) => {
  const conversationId = query.data.id;
  const findSender = query.data.users.find((i) => i.email === arg.sender);
  const findReceiver = query.data.users.find((i) => i.email !== arg.sender);
  const message = query.data.message;
  const timestamp = query.data.timestamp;
  let sender = {};
  let receiver = {};
  sender.email = findSender.email;
  sender.name = findSender.name;
  sender.id = findSender.id;
  receiver.email = findReceiver.email;
  receiver.name = findReceiver.name;
  receiver.id = findReceiver.id;
  return { conversationId, message, timestamp, sender, receiver };
};
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
        const { conversationId, message, timestamp, sender, receiver } =
          createObject(arg, query);
        dispatch(
          messageApi.endpoints.addMessages.initiate({
            conversationId,
            message,
            timestamp,
            sender,
            receiver,
          })
        );
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
        const { conversationId, message, timestamp, sender, receiver } =
          createObject(arg, query);
        dispatch(
          messageApi.endpoints.addMessages.initiate({
            conversationId,
            message,
            timestamp,
            sender,
            receiver,
          })
        );
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
