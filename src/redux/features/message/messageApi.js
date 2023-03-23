import { io } from "socket.io-client";
import { apiSlice } from "../api/apiSlice";

export const messageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // endpoints here
    getMessages: builder.query({
      query: (id) =>
        `/messages?conversationId=${id}&_sort=timestamp&_order=desc&_page=1&_limit=${process.env.REACT_APP_MESSAGE_PER_PAGE}`,
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
          socket.on("messages", (data) => {
            console.log(data, " => Line No: 43");

            updateCachedData((draft) => {
              const messages = draft.find(
                (c) => {
                  console.log(c, data, " => Line No: 32");
                  return +c.id === data.data.id;
                }
                // (c) => true
              );
              if (messages?.id) {
              } else {
                draft.push({
                  conversationId: data?.data?.conversationId,
                  message: data?.data?.message,
                  timestamp: data?.data?.timestamp,
                  receiver: data?.data?.receiver,
                  sender: data?.data?.sender,
                  id: data.data.id,
                });
              }
            });
          });
        } catch (err) {}
        await cacheEntryRemoved;
        socket.close();
      },
    }),
    addMessages: builder.mutation({
      query: (data) => ({
        url: `/messages`,
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // optimistic cache update start
        const patchResult1 = dispatch(
          apiSlice.util.updateQueryData(
            "getMessages",
            arg.conversationId.toString(),
            (draft) => {
              const maxId = draft.reduce((a, b) => {
                a = a > b.id ? a : b.id;
                return a + 1;
              }, -1);
              arg.id = maxId;
              draft.push(arg);
            }
          )
        );
        // optimistic cache update end
        try {
          const query = await queryFulfilled;

          if (query?.data?.id) {
          }
        } catch {
          patchResult1.undo();
        }
      },
    }),
  }),
});
export const { useGetMessagesQuery } = messageApi;
