import React from 'react'
import Job from './Job';

const Browse = () => {
  const randomJobs = [1,2,3,4];
  return (
    <div>
    <div className='max-w-7xl mx-auto my-10'>

        <h1>Searcch Results ({randomJobs.length})</h1>
          <div className='grid grid-cols-3 gap-6 mt-5'>
          {
                randomJobs.map((item,index)=>{
                  return (
                    <Job/>
                  )
                })
              }
          </div>
    </div>
    </div>
  )
}

export default Browse
