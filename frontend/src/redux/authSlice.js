import { createSlice } from "@reduxjs/toolkit";


const authSlice=createSlice({
    name: 'auth',
    initialState:{
        loading:false,
        loggedin:false,
    },
    reducers:{
        setLoading(state,action){
            state.loading=action.payload;
        },
        setLoggedin(state,action){
            console.log(action.payload)
            state.loggedin=action.payload;
        }
    }
})

export const {setLoading,setLoggedin} = authSlice.actions

export default authSlice.reducer