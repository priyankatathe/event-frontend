import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const customerApi = createApi({
    reducerPath: "customerApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/customer`, credentials: "include" }),
    tagTypes: ["customer"],
    endpoints: (builder) => {
        return {
            getCustomer: builder.query({
                query: () => {
                    return { 
                        url: "/customer-get",
                        method: "GET"
                    }
                },
                providesTags: ["customer"],
                transformResponse: data => data.result

            }),
            RegisterCustomer: builder.mutation({
                query: userData => {
                    return {
                        url: "/customer-register",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["customer"]
            }),
            loginCustomer: builder.mutation({
                query: userData => {
                    return {
                        url: "/customer-login",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["customer"]
            }),
            logoutCustomer: builder.mutation({
                query: userData => {
                    return {
                        url: "/customer-logout",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["customer"],
                transformResponse: data => {
                    localStorage.removeItem("customer")
                    return data.result
                }
            }),

        }
    }
})

export const {
    useGetCustomerQuery,
    useLoginCustomerMutation,
    useRegisterCustomerMutation,
    useLogoutCustomerMutation
} = customerApi
