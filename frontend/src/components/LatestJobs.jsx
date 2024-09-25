import React from 'react'
import LatestJobCard from './LatestJobCard'
import { useSelector } from 'react-redux'

// const card = [1,2,3,4,5]
const LatestJobs = () => {
        const {allJobs} = useSelector(state => state.jobs)
  return (
      <div className='max-w-7xl mx-auto my-20'>
            <h1 className='text-4xl font-bold'><span className='text-[#6A38C2]'>Latest & Top </span> Job Openings</h1>
            <div className='grid grid-cols-3 gap-4 my-5'>
                {
                    allJobs.length <= 0 ? <span>No Job Available</span> : allJobs?.slice(0,6).map((job) => <LatestJobCard key={job._id} job={job}/>)
                }
                 {/* {
                        allJobs?.map((job,index)=>(
                            <LatestJobCard val={job} key={index}  />
                        ))
                    } */}

            </div> 

                   
        </div>
  )
}

export default LatestJobs
