import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: 'jobSlice',
    initialState:{
        allJobs:[],
        singleJob:null,
        appliedJobs:[],
        jobsByCompany:[],
        searchByJobTitle:null
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
        },
        setJobsByCompany(state,action){
            state.jobsByCompany=action.payload;
        },
        setSearchJobByJobTitle(state,action){
            state.searchByJobTitle=action.payload;
        }

    }
})

export const {setAllJobs,setSingleJob,setAppliedJobs,setJobsByCompany,setSearchJobByJobTitle} = jobSlice.actions

export default jobSlice.reducer;
