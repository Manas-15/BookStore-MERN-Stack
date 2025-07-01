import { authHeader } from '@/libs/authHeader';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.NEXT_PUBLIC_REACT_APP_ADMIN_API_URL + '/usersapi';

export const usersBaseApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const authHeaders = authHeader();
      // if (authHeaders.Authorization) {
      //   headers.set('Authorization', authHeaders.Authorization);
      // }
      // if (authHeaders['X-TENANT-ID']) {
      //     headers.set('X-TENANT-ID', authHeaders['X-TENANT-ID']);
      // }
      return headers;
    }
  }),
  endpoints: (builder) => ({})
});
