import { createSlice } from "@reduxjs/toolkit";


const authSlice=createSlice({
    name: 'auth',
    initialState:{
        loading:false,
        loggedin:false,
        user:null
    },
    reducers:{
        setLoading(state,action){
            state.loading=action.payload;
        },
        setLoggedin(state,action){
            state.loggedin=action.payload;
        },
        setLoggedInUser(state,action){
            state.user=action.payload;
        }
    }
})

export const {setLoading,setLoggedin,setLoggedInUser} = authSlice.actions

export default authSlice.reducer