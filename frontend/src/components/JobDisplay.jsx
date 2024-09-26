import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Job from "./Job";

const JobDisplay = () => {
  const { allJobs, filterBy } = useSelector((state) => state.jobs);
  const [filteredJob, setFilteredJob] = useState(allJobs || []);

  useEffect(() => {
    const filtered = allJobs?.filter((job) => {
      // Ensure job is an object and has a title
      if (!job || typeof job !== "object" || !job.title) {
        return false; // Exclude invalid job entries
      }

      const jobTitle = job?.title.toLowerCase();
      const location = job?.location.toLowerCase() || "";
      // const searchTerm = searchByJobTitle?.toLowerCase() || '';

      // If neither filterBy nor searchByJobTitle is provided, return true for all jobs
      if (!filterBy) {
        //   return jobTitle.includes(searchTerm);
        return true;
      }
      return (
        location.includes(filterBy.toLowerCase()) ||
        jobTitle.includes(filterBy.toLowerCase())
      );
      // Check for title matches
    });

    setFilteredJob(filtered);
  }, [filterBy, allJobs]);

  return (
    <div>
      {filteredJob?.length <= 0 ? (
        <span>No jobs found</span>
      ) : (
        <div className="flex-1 overflow-y-auto pb-5 md:h-[88vh]  flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 justify-items-center items-center">
            {filteredJob.map((job, index) => (
              <div key={index} className=" w-[90%]">
                <Job job={job} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDisplay;
