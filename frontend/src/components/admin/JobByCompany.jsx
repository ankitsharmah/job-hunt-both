import { COMPANY_API_END_POINT, JOB_API_END_POINT } from '@/utils/constants'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const JobByCompany = () => {
        const {id} = useParams("id");
        console.log("this i si id",id)
        const [jobs , setJobs]=useState([]);
    useEffect(()=>{

            async function getJob(){
                try {
                    const res = await axios.get(`${JOB_API_END_POINT}/company/${id}`)
                    console.log("res is ",res.data.jobs)
                    if(res.data.success){
                        console.log("success")
                        setJobs(res.data.jobs);
                    }
                } catch (error) {
                    console.log(error)
                }
            }

            getJob()

    },[id])

    console.log(jobs)
  return (
    <div>
       {
       jobs.length>=1 ? (jobs.map((job)=>{
          return  <h1 key={job._id}>
                {
                    job.title
                }
            </h1>
        })):(<h1>no data</h1>)
       }
    </div>
  )
}

export default JobByCompany
