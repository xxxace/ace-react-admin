import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:1337/api' }),
    endpoints: builder => ({
        login: builder.mutation({
            query: post => {
                return { url: '/auth/local', method: 'POST', body: post }
            },
            transformResponse: responseData => {
                return responseData
            }
        })
    })
})

export const { useLoginMutation } = userApiSlice;