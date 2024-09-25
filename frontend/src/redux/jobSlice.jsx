import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: 'jobSlice',
    initialState:{
        allJobs:[],
        singleJob:null,
        appliedJobs:[],
        jobsByCompany:[],
        creatingJob:false,
        searchByJobTitle:null,
        filterBy:null
        
    },
    reducers:{
        setFilterBy(state,action){
            state.filterBy = action.payload;
        },
        setCreatingJob(state,action){
            state.creatingJob=action.payload;
        },
        setAllJobs(state,action){
            state.allJobs=action.payload;
        },
        setSingleJob(state,action){
            state.singleJob=action.payload;
        },
        setAppliedJobs(state,action){
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

export const {setAllJobs,setSingleJob,setFilterBy,setAppliedJobs,setJobsByCompany,setSearchJobByJobTitle,setCreatingJob} = jobSlice.actions

export default jobSlice.reducer;
