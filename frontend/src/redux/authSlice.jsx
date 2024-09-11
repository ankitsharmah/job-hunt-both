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
            console.log(action.payload)
            state.loggedin=action.payload;
        },
        setLoggedInUser(state,action){
            console.log(action.payload)
            state.user=action.payload;
        }
    }
})

export const {setLoading,setLoggedin,setLoggedInUser} = authSlice.actions

export default authSlice.reducer