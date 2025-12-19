import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/auth`, credentials: "include" }),
    tagTypes: ["auth"],
    endpoints: (builder) => {
        return {
            getAdmin: builder.query({
                query: () => {
                    return {
                        url: "/admin-fetch",
                        method: "GET"
                    }
                },
                providesTags: ["auth"],
                transformResponse: data => data.result

            }),
            registerAdmin: builder.mutation({
                query: AdminData => {
                    return {
                        url: "/admin-register",
                        method: "POST",
                        body: AdminData
                    }
                },
                invalidatesTags: ["auth"]
            }),
            loginAdmin: builder.mutation({
                query: AdminData => {
                    return {
                        url: "/admin-login",
                        method: "POST",
                        body: AdminData
                    }
                },
                invalidatesTags: ["auth"],
                transformResponse: data => {
                    console.log(data);

                    localStorage.setItem("admin", JSON.stringify(data.result))
                    return data.result
                }
            }),
            logoutAdmin: builder.mutation({
                query: AdminData => {
                    return {
                        url: "/admin-logout",
                        method: "POST",
                        body: AdminData
                    }
                },
                invalidatesTags: ["auth"],
                transformResponse: data => {
                    localStorage.removeItem("admin")
                    return data.result
                }
            }),

            getAuthEvent: builder.query({
                query: () => {
                    return {
                        url: "/admin-event",
                        method: "GET"
                    }
                },
                providesTags: ["auth"],
                transformResponse: data => data.result
            }),
            updateAdmin: builder.mutation({
                query: ({ id, data }) => ({
                    url: `/admin-update/${id}`,
                    method: "PUT",
                    body: data,
                }),
                invalidatesTags: ["auth"],
            }),


            getEventBookings: builder.query({
                query: (eventId) => {
                    return {
                        url: `/admin/event/${eventId}/bookings`,
                        method: "GET"
                    }
                },
                providesTags: ["bookings"],
                transformResponse: data => data.result
            }),

        }
    }
})

export const {
    useGetAdminQuery,
    useLoginAdminMutation,
    useLogoutAdminMutation,
    useRegisterAdminMutation,
    useGetAuthEventQuery,
    useUpdateAdminMutation,
    useGetEventBookingsQuery
} = authApi
