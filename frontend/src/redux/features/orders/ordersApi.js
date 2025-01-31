import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseUrl";

const ordersApi = createApi({
    reducerPath: 'ordersApi',
    baseQuery: fetchBaseQuery({
        baseUrl:`${getBaseUrl()}/api/orders`,
        credentials: 'include'
    }),
    tagTypes: ['Orders'],
    endpoints: (builder) => ({
        createOrder: (builder.mutation) ({
            query:(newOrder) => ({
                url: "/",
                method:"POST",
                body: newOrder,
                credentials:'include',
            })
        }),
        getOrderByEmail: (builder.query) ({
            query: (email) => ({
                url: `/email/${email}`
            }),
            providesTags: ['Orders']
        }),
        requestReturn: builder.mutation({
            query: ({ purchaseId, reason }) => ({
                url: `/return-request`,
                method: "POST",
                body: { purchaseId, reason },
                credentials: 'include',
            }),
            invalidatesTags: ['Orders'],
        }),
    })
})

export const {useCreateOrderMutation, useGetOrderByEmailQuery, useRequestReturnMutation} = ordersApi;

export default ordersApi;