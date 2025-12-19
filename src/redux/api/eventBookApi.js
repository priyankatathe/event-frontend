import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const eventBookApi = createApi({
    reducerPath: "eventBookApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/event`, credentials: "include" }),
    tagTypes: ["event"],
    endpoints: (builder) => {
        return {
            getEvent: builder.query({
                query: () => {
                    return {
                        url: "/event-get",
                        method: "GET"
                    }
                },
                providesTags: ["event"],
            }),

            getEventById: builder.query({
                query: (id) => ({
                    url: `/event/${id}`,
                    method: "GET"
                }),
                providesTags: ["event"]
            }),

            addEvent: builder.mutation({
                query: userData => {
                    return {
                        url: "/event-add",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["event"]
            }),
            BookEvent: builder.mutation({
                query: userData => {
                    return {
                        url: "/book-ticket",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["event"]
            }),
            updateEvent: builder.mutation({
                query: ({ id, data }) => ({
                    url: `/event-update/${id}`,
                    method: "PUT",
                    body: data,
                }),
                invalidatesTags: ["event"],
            }),

            deleteEvent: builder.mutation({
                query: (id) => ({
                    url: `/event-delete/${id}`,
                    method: "DELETE",
                }),
                invalidatesTags: ["event"],
            }),


        }
    }
})

export const {
    useAddEventMutation,
    useGetEventByIdQuery,
    useGetEventQuery,
    useBookEventMutation,
    useDeleteEventMutation,
    useUpdateEventMutation
} = eventBookApi
