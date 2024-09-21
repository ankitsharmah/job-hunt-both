import React, { useState } from "react";
// import FilterPage from "./FilterPage";
import Job from "./Job";
// import { Bookmark } from "lucide-react";
import FilterCard from "./FilterCard";
import { useSelector } from "react-redux";
import JobDisplay from "./JobDisplay";

const Jobs = () => {


  return (
    <div className="max-w-7xl mx-auto mt-5">
      <div className="flex gap-6">
        <div className="w-[20%]">
          <FilterCard />
        </div>

          <JobDisplay />
      </div>
    </div>
  );
};

export default Jobs;
