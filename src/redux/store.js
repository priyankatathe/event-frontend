import { configureStore } from "@reduxjs/toolkit";
import { eventBookApi } from "./api/eventBookApi";
import { authApi } from "./api/authApi";
import authSlice from "./slice/authSlice"
import { customerApi } from "./api/customerApi";
import { razorpayApi } from "./api/razorpayApi";

const reduxStore = configureStore({
    reducer: {
        [eventBookApi.reducerPath]: eventBookApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [customerApi.reducerPath]: customerApi.reducer,
        [razorpayApi.reducerPath]: razorpayApi.reducer,
        Auth: authSlice

    },
    middleware: def => [...def(),
    authApi.middleware,
    eventBookApi.middleware,
    customerApi.middleware,
    razorpayApi.middleware,
    ]
})

export default reduxStore