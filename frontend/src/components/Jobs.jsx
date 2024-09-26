import React, { useState } from "react";
// import FilterPage from "./FilterPage";
import Job from "./Job";
// import { Bookmark } from "lucide-react";
import FilterCard from "./FilterCard";
import { useSelector } from "react-redux";
import JobDisplay from "./JobDisplay";
import useGetJobs from "@/hooks/useGetJobs";

const Jobs = () => {
  useGetJobs();


  return (
    <div className="max-w-7xl mx-auto mt-5">
    <h1 className="text-xl text-center font-bold mb-2">Jobs</h1>
      <div className="flex gap-6">
        {/* <div className="w-[20%]"> */}
        <div className="md:block hidden">

          <FilterCard />
        </div>
        {/* </div> */}

          <JobDisplay />
      </div>
    </div>
  );
};

export default Jobs;
