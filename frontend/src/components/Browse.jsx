import React, { useEffect, useState } from 'react'
import Job from './Job';
import { useSelector } from 'react-redux';

const Browse = () => {
  const { allJobs, searchByJobTitle } = useSelector(state => state.jobs);
  const [filteredJob, setFilteredJob] = useState(allJobs || []);

  useEffect(() => {
      const filtered = allJobs?.filter(job => {
          // Ensure job is an object and has a title
          if (!job || typeof job !== 'object' || !job.title) {
              console.log("Invalid job entry:", job); // Log invalid job
              return false; // Exclude invalid job entries
          }

          const jobTitle = job.title.toLowerCase();
          const searchTerm = searchByJobTitle?.toLowerCase() || '';

          // If neither filterBy nor searchByJobTitle is provided, return true for all jobs
          if (!searchByJobTitle ) {
            // return jobTitle.includes(searchTerm);
              return true;
          }
            return  jobTitle.includes(searchTerm.toLowerCase()); 
          // Check for title matches
      });

      setFilteredJob(filtered);
  }, [ allJobs, searchByJobTitle]);
  
  
  return (
    <div className='max-w-7xl mx-auto my-10'>
            <h1>Total jobs ({filteredJob.length})</h1>
        {filteredJob?.length <= 0 ? (
            <span>No jobs found</span>
        ) : (
            <div className="flex-1 overflow-y-auto pb-5 h-[88vh]">
                <div className="grid grid-cols-3 gap-4">
                    {filteredJob.map((job, index) => (
                        <div key={index}>
                            <Job job={job} />
                        </div>
                    ))}
                </div>
            </div>
        )}
    </div>
);
}

export default Browse
