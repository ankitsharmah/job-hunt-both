import { COMPANY_API_END_POINT, JOB_API_END_POINT } from '@/utils/constants'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Job from '../Job'

import { Edit2, MoreHorizontal } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setCreatingJob, setJobsByCompany, setSearchJobByJobTitle } from '@/redux/jobSlice'
import JobByCompanyTable from './JobByCompanyTable'

const JobByCompany = () => {
        const {name,id} = useParams();
        const navigate = useNavigate();
        const dispatch= useDispatch();
        const {creatingJob} = useSelector(state=>state.jobs)
        
        const [jobs , setJobs]=useState([]);
    useEffect(()=>{

            async function getJob(){
                try {
                  dispatch(setCreatingJob(true));
                  
                    const res = await axios.get(`${JOB_API_END_POINT}/company/${id}`)
                    if(res.data.success){
                        setJobs(res.data.jobs);
                        dispatch(setJobsByCompany(res.data.jobs))
                    }
                } catch (error) {
                    console.log(error)
                }
                finally{
                  dispatch(setCreatingJob(false));

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
         
            <Edit2 className='w-6 h-8 font-bold  cursor-pointer' onClick={() => navigate(`/admin/companies/${id}`)} />
            

      </div>

      <div className='flex items-center justify-between h-12 '>
        <input type="text " className='outline p-1 ' placeholder='job name' onChange={(e)=>{dispatch(setSearchJobByJobTitle(e.target.value))}}/>
        <button className='bg-black text-white rounded-md p-2' onClick={()=>{navigate(`/admin/company/${name}/post-job/${id}`)}}>
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
