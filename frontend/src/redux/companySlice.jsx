import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    companies: [],
    isLoading: false,
    searchBycompanyName: null,
    oneCompany: null,
    oneCompanyjob: []
  },
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;  // Correctly setting isLoading to action's payload
    },
    setCompany(state, action) {
      state.isLoading = false;  // Resetting loading to false after companies are set
      if (action.payload.length === 0) {
        state.companies = [];  // Correctly resetting companies to an empty array
      } else {
        state.companies = action.payload;  // Setting companies to the payload
      }
    },
    setCompanyName(state, action) {
      state.searchBycompanyName = action.payload;
    },
    setOneCompany(state, action) {
      state.oneCompany = action.payload;
    },
    setOneCompanyJob(state, action) {
      state.oneCompanyjob = action.payload;
    },
    resetCompanyState(state) {
      // Resetting the company-related state to initial values
      state.companies = [];
      state.isLoading = false;
      state.searchBycompanyName = null;
      state.oneCompany = null;
      state.oneCompanyjob = [];
    }
  }
});

// Exporting actions
export const {
  setCompany,
  setLoading,
  setCompanyName,
  setOneCompany,
  setOneCompanyJob,
  resetCompanyState // Export the reset action
} = companySlice.actions;

export default companySlice.reducer;
