import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import jobSlice from "./jobSlice";
import companySlice from "./companySlice";



const store = configureStore({
    reducer:{
            auth:authSlice,
            jobs:jobSlice,
            company:companySlice
    }
})


export default store;