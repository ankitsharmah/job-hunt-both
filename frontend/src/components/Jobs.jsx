import React from "react";
// import FilterPage from "./FilterPage";
import Job from "./Job";
// import { Bookmark } from "lucide-react";
import FilterCard from "./FilterCard";

const Jobs = () => {
  const jobArray = [1, 2, 3, 4, 5, 6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22];

  return (
    <div className="max-w-7xl mx-auto mt-5">
      <div className="flex gap-6">
        <div className="w-[20%]">
          <FilterCard />
        </div>

        {jobArray.length <= 0 ? (
          <span>no jobs found </span>
        ) : (
          <div className="flex-1 overflow-y-auto pb-5 h-[88vh] ">
            <div className="grid grid-cols-3 gap-4">
              {jobArray.map((job, index) => (
                <div>
                  <Job />
                        
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
