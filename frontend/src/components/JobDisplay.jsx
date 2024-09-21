import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Job from './Job';

const JobDisplay = () => {
    const{allJobs,filterBy} = useSelector(state=>state.jobs);
    const [filterdJob,setFilterdJob]=useState(allJobs || [])

        useEffect(()=>{
          const filterd=allJobs.filter((job)=>{
            if(!filterBy){
              return true;
            }
            return job.location.toLowerCase().includes(filterBy.toLowerCase()) || job.title.toLowerCase().includes(filterBy.toLowerCase()) ;
            // || job.salary.toLowerCase().includes(filterBy.toLowerCase()) ;
          })

          setFilterdJob(filterd);
        },[filterBy])

  return (
    <div>
      {filterdJob.length <= 0 ? (
          <span>no jobs found </span>
        ) : (
          <div className="flex-1 overflow-y-auto pb-5 h-[88vh] ">
            <div className="grid grid-cols-3 gap-4">
              {filterdJob.map((job, index) => (
                <div>
                  <Job job={job} key={index}/>
                </div>
              ))}
            </div>
          </div>
        )}
    </div>
  )
}

export default JobDisplay
