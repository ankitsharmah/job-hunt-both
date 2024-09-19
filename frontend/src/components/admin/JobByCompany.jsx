import { COMPANY_API_END_POINT, JOB_API_END_POINT } from '@/utils/constants'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Job from '../Job'

import { Edit2, MoreHorizontal } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setJobsByCompany, setSearchJobByJobTitle } from '@/redux/jobSlice'
import JobByCompanyTable from './JobByCompanyTable'

const JobByCompany = () => {
        const {name,id} = useParams();
        const navigate = useNavigate();
        const dispatch= useDispatch();
        // const {id} = useParams("id");
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
                        dispatch(setJobsByCompany(res.data.jobs))
                    }
                } catch (error) {
                    console.log(error)
                }
            }

            getJob()

          },[id])
    // console.log("this is in the job : ",job._id)
  
          

  return (
    
      <div className={"max-w-6xl mx-auto "}> 
      <div className={"max-w-6xl mx-auto gap-2 text-[#6A38C2] bg-gray-100 my-10 p-4 flex items-center justify-center"}> 

          <h1 className='text-2xl font-semibold text-center '>
            {
              name?.charAt(0).toUpperCase()+name?.slice(1)
            }
            
          </h1>
         
            <Edit2 className='w-6 h-8 font-bold  cursor-pointer' onClick={() => navigate(`/admin/companies/${jobs[0]?.company._id}`)} />
            

      </div>

      <div>
        <input type="text " className='outline ' placeholder='job name' onChange={(e)=>{dispatch(setSearchJobByJobTitle(e.target.value))}}/>
        <button className='bg-yellow-50 p-3'>
          Create Job
        </button>
      </div>

      <div>
       
          <JobByCompanyTable />
       
    </div>
    </div>
    
  
  )
}

export default JobByCompany
