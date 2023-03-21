import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: process.env.REACT_APP_API_URL,
    baseUrl: "http://localhost:9000/",
  }),
  tagTypes: [],
  endpoints: (builder) => ({}),
});
