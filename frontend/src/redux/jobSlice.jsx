import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: 'jobSlice',
    initialState:{
        allJobs:[],
        singleJob:null,
        appliedJobs:[]
    },
    reducers:{
        setAllJobs(state,action){
            console.log(action.payload)
            state.allJobs=action.payload;
        },
        setSingleJob(state,action){
            state.singleJob=action.payload;
        },
        setAppliedJobs(state,action){
            console.log(action.payload)
            state.appliedJobs=action.payload;
        }
    }
})

export const {setAllJobs,setSingleJob,setAppliedJobs} = jobSlice.actions

export default jobSlice.reducer;
