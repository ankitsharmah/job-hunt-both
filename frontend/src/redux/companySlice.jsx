import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    companies: [],   // Corrected 'companies' typo
    isLoading: false,
    searchBycompanyName:null,
    oneCompany:null,
    oneCompanyjob:[]
  },
  reducers: {
    setLoading(state, action) {
      console.log("setLoading called with", action.payload);
      state.isLoading = action.payload;  // Correctly setting isLoading to action's payload
    },
    setCompany(state, action) {
      state.isLoading = false;  // Resetting loading to false after companies are set
      state.companies = action.payload;  // Corrected 'companies' typo
    },
    setCompanyName(state,action){
        state.searchBycompanyName=action.payload;
    },
    setOneCompany(state,action){
        state.oneCompany=action.payload;
    },
    setOneCompanyJob(state,action){
        state.oneCompanyjob=action.payload
    }
  }
});

export const { setCompany, setLoading ,setCompanyName,setOneCompany,setOneCompanyJob} = companySlice.actions;
export default companySlice.reducer;
