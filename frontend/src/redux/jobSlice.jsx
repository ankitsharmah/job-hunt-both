import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: 'jobSlice',
    initialState: {
        allJobs: [],
        singleJob: null,
        gettingAppliedJobs:false,
        appliedJobs: [],
        jobsByCompany: [],
        creatingJob: false,
        searchByJobTitle: null,
        filterBy: null
    },
    reducers: {setGettingAppliedJobs(state,action){
        state.gettingAppliedJobs=action.payload;
    },
        setFilterBy(state, action) {
            state.filterBy = action.payload;
        },
        setCreatingJob(state, action) {
            state.creatingJob = action.payload;
        },
        setAllJobs(state, action) { 
            state.allJobs = action.payload || [];
        },
        setSingleJob(state, action) {
            state.singleJob = action.payload;
        },
        setAppliedJobs(state, action) {
            state.gettingAppliedJobs=false;
            state.appliedJobs = action.payload;
        },
        setJobsByCompany(state, action) {
            state.jobsByCompany = action.payload;
        },
        setSearchJobByJobTitle(state, action) {
            state.searchByJobTitle = action.payload;
        },
        resetJobState(state) {
            // Resetting the state to initial values
            state.allJobs = [];
            state.singleJob = null;
            state.appliedJobs = [];
            state.jobsByCompany = [];
            state.creatingJob = false;
            state.searchByJobTitle = null;
            state.filterBy = null;
        }
    }
});

export const { 
    setAllJobs, 
    setSingleJob, 
    setFilterBy, 
    setAppliedJobs, 
    setJobsByCompany, 
    setSearchJobByJobTitle, 
    setCreatingJob, 
    resetJobState ,
    setGettingAppliedJobs
} = jobSlice.actions;

export default jobSlice.reducer;
