import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { useDispatch, useSelector } from 'react-redux'
import { Cross, Delete, DeleteIcon, Edit2, EyeIcon, MoreHorizontal } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constants'
import { setJobsByCompany } from '@/redux/jobSlice'
import { TailSpin } from 'react-loader-spinner'
import Loader from '../Loader'


const JobByCompanyTable = () => {
    const navigate = useNavigate();
    const{name,id}=useParams();
    const dispatch = useDispatch();
    const jobs = useSelector(state=>state.jobs.jobsByCompany)
    const {searchByJobTitle,creatingJob,jobsByCompany} = useSelector(state=>state.jobs)
    const [filterdJob , setFilterdJob]=useState([]);

    const [jobId,setJobId]= useState(null);

  

    useEffect(()=>{

        const filterdData = jobs.filter((oneJob)=>{
            if(!searchByJobTitle){
                return true;
            }
            return oneJob.title.toLowerCase().includes(searchByJobTitle.toLowerCase());
            
        })

        setFilterdJob(filterdData);

       
    },[jobs,jobsByCompany,searchByJobTitle])

    async function deleteJob(){
      try {
        const res = await axios.delete(`${JOB_API_END_POINT}/delete/${jobId}`);

        if(res.data.success){
          const newJobs = jobs?.filter((job)=>{
                    if(job.id === jobId){
                      return false;
                    }
                    return true;
          })

          dispatch(setJobsByCompany(newJobs));
        }
      } catch (error) {
        console.log(error)
      }
    }

    return (
    <div>
           <Table className={"max-w-6xl mx-auto"}>
        <TableCaption>{creatingJob ? <Loader />:(<p>A list of your recent Posted Jobs</p>)}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>S no.</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Experience</TableHead>
            <TableHead>Openenig</TableHead>
            <TableHead>salary</TableHead>
            <TableHead>Apllicants</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
           !creatingJob && filterdJob && filterdJob.map((job,index)=>(
            <TableRow key={job._id}  className={"cursor-pointer"}  >
              <TableCell>
                {index+1}
              </TableCell>
              <TableCell>{job.title}</TableCell>
              <TableCell>{new Date(job.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>{job.experienceLevel} years</TableCell>
              <TableCell>{job.position}</TableCell>
              <TableCell>{job.salary}lpa</TableCell>
              <TableCell>{job.applications.length}</TableCell>
              {/* <TableCell>{new Date(job.createdAt).toLocaleDateString()}</TableCell> */}
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                  <PopoverContent className="w-fit flex flex-col items-start gap-1 justify-center">
                    <div onClick={() => navigate(`/admin/company/${job.company.name}/updatejob/${job._id}`)} className='flex items-center gap-2 w-full text-white px-2 py-1 rounded-md bg-green-400 cursor-pointer'>
                      <Edit2 className='w-4' />
                      <span>Edit</span>
                    </div>
                    <div onClick={() => {
                        navigate(`/admin/company/${name}/job/${job.title}/${job._id}`)
                    }} className='flex items-center bg-[#a539e0] px-2 py-1 w-[100%] rounded-md text-white gap-2  cursor-pointer'>
                      <EyeIcon className='w-4 h-4' />
                      <span>Applications </span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))
          }
        </TableBody>
      </Table>
    </div>
  )
}

export default JobByCompanyTable
