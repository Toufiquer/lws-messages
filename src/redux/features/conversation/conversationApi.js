import { io } from "socket.io-client";
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
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        // create socket
        const socket = io("http://localhost:9000", {
          reconnectionDelay: 1000,
          reconnection: true,
          reconnectionAttempts: 10,
          transports: ["websocket"],
          agent: false,
          upgrade: false,
          rejectUnauthorized: false,
        });
        try {
          await cacheDataLoaded;
          socket.on("conversations", (data) => {
            console.log(data, " => Line No: 43");

            updateCachedData((draft) => {
              const conversation = draft.find((c) => +c.id === data.data.id);
              if (conversation?.id) {
                conversation.message = data?.data?.message;
                conversation.timestamp = data?.data?.timestamp;
              } else {
                // draft.push(data.data.message);
              }
            });
          });
        } catch (err) {}
        // await cacheEntryRemoved;
        // socket.close();
      },
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
        // optimistic cache update start
        // const patchResult1 = dispatch(
        //   apiSlice.util.updateQueryData(
        //     "getConversations",
        //     arg.sender,
        //     (draft) => {
        //       const draftConversation = {
        //         message: arg.data.message,
        //         timestamp: arg.data.timestamp,
        //         id: draft.length + 1,
        //       };
        //       draft.push(draftConversation);
        //     }
        //   )
        // );
        // optimistic cache update end
        try {
          const query = await queryFulfilled;
          if (query?.data?.id) {
            const { conversationId, message, timestamp, sender, receiver } =
              createObject(arg, query);
            const res = dispatch(
              messageApi.endpoints.addMessages.initiate({
                conversationId,
                message,
                timestamp,
                sender,
                receiver,
              })
            ).unwrap();
            // pessimistic cache update start
            console.log(res, " => Line No: 68");
            dispatch(
              apiSlice.util.updateQueryData(
                "getConversations",
                arg.sender,
                (draft) => {
                  const draftConversation = {
                    message: arg.data.message,
                    timestamp: arg.data.timestamp,
                    id: res.conversationId,
                  };
                  draft.push(draftConversation);
                }
              )
            );
            // pessimistic cache update end
          }
        } catch {
          // patchResult1.undo();
        }
      },
    }),
    editConversation: builder.mutation({
      query: ({ sender, id, data }) => ({
        url: `/conversations/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // optimistic cache update start
        // const patchResult1 = dispatch(
        //   apiSlice.util.updateQueryData(
        //     "getConversations",
        //     arg.sender,
        //     (draft) => {
        //       const draftConversation = draft.find((c) => +c.id === arg.id);
        //       draftConversation.message = arg.data.message;
        //       draftConversation.timestamp = arg.data.timestamp;
        //     }
        //   )
        // );
        // optimistic cache update end
        try {
          const query = await queryFulfilled;
          if (query?.data?.id) {
            const { conversationId, message, timestamp, sender, receiver } =
              createObject(arg, query);
            const res = await dispatch(
              messageApi.endpoints.addMessages.initiate({
                conversationId,
                message,
                timestamp,
                sender,
                receiver,
              })
            ).unwrap();

            // pessimistic cache update start
            dispatch(
              apiSlice.util.updateQueryData(
                "getConversations",
                arg.sender,
                (draft) => {
                  const draftConversation = draft.find((c) => +c.id === arg.id);
                  draftConversation.message = arg.data.message;
                  draftConversation.timestamp = arg.data.timestamp;
                }
              )
            );
            // pessimistic cache update end
          }
        } catch {
          // patchResult1.undo();
        }
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
