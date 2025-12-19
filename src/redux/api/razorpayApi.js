import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const razorpayApi = createApi({
    reducerPath: "razorpayApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/razorpay`, credentials: "include" }),
    tagTypes: ["razorpay"],
    endpoints: (builder) => {
        return {
            getBookingHistory: builder.query({
                query: () => {
                    return {
                        url: "/admin-history",
                        method: "GET"
                    };
                },
                providesTags: ["razorpay"],
                transformResponse: data => data.bookings

            }),

            BookingPayment: builder.mutation({
                query: userData => {
                    return {
                        url: "/book-ticket-payment",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["razorpay"]
            }),
            VerifyPayment: builder.mutation({
                query: userData => {
                    return {
                        url: "/verify-payment",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["razorpay"]
            }),

        }
    }
})

export const {
    useBookingPaymentMutation,
    useGetBookingHistoryQuery,
    useVerifyPaymentMutation
} = razorpayApi
