import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { useSelector } from 'react-redux'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useNavigate } from 'react-router-dom'


const JobByCompanyTable = () => {
    const navigate = useNavigate();

    const jobs = useSelector(state=>state.jobs.jobsByCompany)
    const {searchByJobTitle} = useSelector(state=>state.jobs)
    const [filterdJob , setFilterdJob]=useState([]);

  console.log("sel;ellctd : ",searchByJobTitle)


    useEffect(()=>{

        const filterdData = jobs.filter((oneJob)=>{
            if(!searchByJobTitle){
                return true;
            }
            return oneJob.title.toLowerCase().includes(searchByJobTitle.toLowerCase());
            
        })

        setFilterdJob(filterdData);

       
    },[jobs,searchByJobTitle])

    return (
    <div>
           <Table className={"max-w-6xl mx-auto"}>
        <TableCaption>A list of your recent registered Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>S no.</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Openenig</TableHead>
            <TableHead>salary</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterdJob && filterdJob.map((job,index)=>(
            <TableRow key={job._id}  className={"cursor-pointer"}>
              <TableCell>
                {index+1}
              </TableCell>
              <TableCell>{job.title}</TableCell>
              <TableCell>{new Date(job.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>{job.position}</TableCell>
              <TableCell>{job.salary}</TableCell>
              {/* <TableCell>{new Date(job.createdAt).toLocaleDateString()}</TableCell> */}
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div onClick={() => navigate(`/admin/company/${job.company.name}/updatejob/${job._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                      <Edit2 className='w-4' />
                      <span>Edit</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default JobByCompanyTable
