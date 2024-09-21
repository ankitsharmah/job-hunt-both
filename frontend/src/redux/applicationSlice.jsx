import { createSlice } from "@reduxjs/toolkit"


const applicationSlice = createSlice({
    name:"application",
    initialState:{
        applications:null,
        lodaingApplications:false
    },
    reducers:{
        setApplications(state,action){
            state.applications = action.payload;
        },
        setLoadingApplications(state,action){
            state.lodaingApplications=action.payload;
        }
    }
})

export const {setApplications,setLoadingApplications} = applicationSlice.actions;

export default applicationSlice.reducer