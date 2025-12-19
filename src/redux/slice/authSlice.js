import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";
import { customerApi } from "../api/customerApi";

const authSlice = createSlice({
    name: "authSlice",
    initialState: {
        admin: JSON.parse(localStorage.getItem("admin")),
        customer: JSON.parse(localStorage.getItem("customer")),
    },
    reducers: {
        adminLogout: (state, { payload }) => {
            localStorage.removeItem("admin")
            state.admin = null
        },
        customerLogout: (state, { payload }) => {
            localStorage.removeItem("customer")
            state.customer = null
        },
    },
    extraReducers: builder => builder
        .addMatcher(authApi.endpoints.loginAdmin.matchFulfilled, (state, { payload }) => {
            state.admin = payload
        })
        .addMatcher(authApi.endpoints.logoutAdmin.matchFulfilled, (state, { payload }) => {
            state.admin = null
        })
        //customer
        .addMatcher(customerApi.endpoints.loginCustomer.matchFulfilled, (state, { payload }) => {
            state.customer = payload
            localStorage.setItem("customer", JSON.stringify(payload))
        })
        .addMatcher(customerApi.endpoints.logoutCustomer.matchFulfilled, (state, { payload }) => {
            state.customer = null
            localStorage.removeItem("customer")
        })


})

export const {
    adminLogout
} = authSlice.actions
export default authSlice.reducer