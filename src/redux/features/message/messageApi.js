import { io } from "socket.io-client";
import { apiSlice } from "../api/apiSlice";

export const messageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // endpoints here
    getMessages: builder.query({
      query: (id) =>
        `/messages?conversationId=${id}&_sort=timestamp&_order=desc&_page=1&_limit=${process.env.REACT_APP_MESSAGE_PER_PAGE}`,
      // async onCacheEntryAdded(
      //   arg,
      //   { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      // ) {
      //   // create socket
      //   const socket = io("http://localhost:9000", {
      //     reconnectionDelay: 1000,
      //     reconnection: true,
      //     reconnectionAttempts: 10,
      //     transports: ["websocket"],
      //     agent: false,
      //     upgrade: false,
      //     rejectUnauthorized: false,
      //   });
      //   try {
      //     await cacheDataLoaded;
      //     socket.on("messages", (data) => {
      //       if (arg !== data.data.email) {
      //         updateCachedData((draft) => {
      //           const messages = draft.find(
      //             (c) => +c.conversationId === data.data.conversationId
      //             // (c) => true
      //           );
      //           if (messages?.conversationId) {
      //             draft.push({
      //               message: data?.data?.message,
      //               timestamp: data?.data?.timestamp,
      //               receiver: data?.data?.receiver,
      //               sender: data?.data?.sender,
      //             });
      //           } else {
      //             // draft.push(data.data.message);
      //           }
      //         });
      //       }
      //     });
      //   } catch (err) {}
      //   // await cacheEntryRemoved;
      //   // socket.close();
      // },
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
