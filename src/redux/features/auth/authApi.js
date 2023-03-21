import { apiSlice } from "../api/apiSlice";
const saveToLocalStorage = (name, data) => {
  localStorage.setItem(
    name,
    JSON.stringify({
      ...data,
    })
  );
};
export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // endpoints here
    register: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const data = {
            accessToken: result.data.accessToken,
            user: result.data.user,
          };
          saveToLocalStorage("auth", { ...data });
          dispatch({
            ...data,
          });
        } catch (error) {}
      },
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
          dispatch({
            accessToken: result.data.accessToken,
            user: result.data.user,
          });
        } catch (error) {}
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
