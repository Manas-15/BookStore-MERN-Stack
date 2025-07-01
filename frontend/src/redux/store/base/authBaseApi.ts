import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.NEXT_PUBLIC_REACT_APP_MAIN_API_URL;

export const authBaseApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      return headers;
    }
  }),
  endpoints: (builder) => ({})
});
