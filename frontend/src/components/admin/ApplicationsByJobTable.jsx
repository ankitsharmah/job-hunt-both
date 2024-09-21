import { Popover, PopoverContent ,PopoverTrigger} from '@radix-ui/react-popover';
import { CircleX, Edit2, EyeIcon, MoreHorizontal, WormIcon, Zap } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { useDispatch, useSelector } from 'react-redux';
// import Companies from './Companies';  // Assuming this imports default company data for fallback
import { useNavigate, useParams } from 'react-router-dom';
import { Badge } from '../ui/badge';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constants';
import { setApplications } from '@/redux/applicationSlice';
const ApplicationsByJobTable = () => {
  const {jobname,id}=useParams()
  const { applications } = useSelector(state => state.application);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [action,setAction] = useState({
    status:"pending",
    jobId:"",
  });
    // console.log("in application ", applications)
      // const [filterCompany, setFilterCompany] = useState( applications?.applications || []);
    
      // // console.log("selellctd : ", companies)
      // useEffect(() => {
        
    
      //   setFilterCompany(applications?.applications);
      // }, [id,applications]);
    
    
      async function handleUpdateStatus(actions) {
        try {
          console.log("in fetch ", actions);
      
          // Send the status update to the backend
          const res = await axios.post(
            `${APPLICATION_API_END_POINT}/update/application/${actions.jobId}`,
            { status: actions.status },
            { withCredentials: true }
          );
      
          console.log(res.data)
          if (res.data.success) {
            const updatedApplications = applications?.applications?.map((application) => {
              // If the application id matches the one in actions, update the status
              if (application._id === actions.jobId) {
                return {
                  ...application,
                  status: actions.status // Update the status
                };
              }
              console.log("matched ",application._id," ",actions.jobId)
              // Otherwise, return the original application object unchanged
              return application;
            });
            const updatedJob = {
              ...applications,
              applications: updatedApplications
            }
            console.log("this is updated aplications ",updatedJob)
            // Dispatch the updated applications to the state/store
            dispatch(setApplications(updatedJob));
          }
        } catch (error) {
          console.log(error);
        }
      }
      
        
      
    
  return (
    <div>
          <Table>
        <TableCaption>A list of Applicants for {jobname}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className={"font-bold text-black"}>Full Name</TableHead>
            <TableHead className={"font-bold text-black"}>Email</TableHead>
            <TableHead className={"font-bold text-black"}>Contact</TableHead>
            <TableHead className={"font-bold text-black"}>Resume</TableHead>
            <TableHead className={"font-bold text-black"}>Date</TableHead>
            <TableHead className={"font-bold text-black"}>Status</TableHead>
            <TableHead className="text-right text-black font-bold">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications?.applications && applications?.applications.map(applicant => (
            <TableRow key={applicant._id} className={"cursor-pointer"}>
           
              <TableCell >{applicant.applicant.fullname}</TableCell>
              <TableCell >{applicant.applicant.email}</TableCell>
              <TableCell >{applicant.applicant.phoneNumber}</TableCell>
              <TableCell >{
                applicant.applicant.profile.resumeOriginalName? (<a href={applicant.applicant.profile.resume} target='_blank' className='text-cyan-400'>{applicant.applicant.profile.resumeOriginalName}</a>):(<span>NA</span>)
              }</TableCell>
              <TableCell >{new Date(applicant.createdAt).toLocaleDateString()}</TableCell>
              <TableCell ><Badge className={applicant.status==="rejected"  ? "bg-red-400 hover:bg-red-500":applicant.status === "pending" ? "bg-gray-400 ":" bg-green-400 hover:bg-green-500"}>{applicant.status}</Badge></TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                  <PopoverContent className="w-fit p-3 flex flex-col items-start gap-1 bg-gray-50 shadow-xl justify-center">
                  <div 
                      data-name="accepted" 
                      onClick={(e) => {
                        const updatedAction = {
                          status: e.currentTarget.dataset.name,
                          jobId: applicant._id
                        };
                        setAction(updatedAction);
                        console.log(updatedAction);
                        handleUpdateStatus(updatedAction);
                      }} 
                      className="flex items-center gap-2 w-full text-white px-2 py-1 rounded-md bg-green-400 cursor-pointer"
                    >
                      <Zap className="w-4" />
                      <span>Accept</span>
                    </div>

                    <div 
                      data-name="rejected" 
                      onClick={(e) => {
                        const updatedAction = {
                          status: e.currentTarget.dataset.name,
                          jobId: applicant._id
                        };
                        setAction(updatedAction);
                        console.log(updatedAction);
                        handleUpdateStatus(updatedAction);
                      }} 
                      className="flex items-center bg-[#f13a3a] px-2 py-1 w-[100%] rounded-md text-white gap-2 cursor-pointer"
                    >
                      <CircleX className="w-4 h-4" />
                      <span>Reject</span>
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

export default ApplicationsByJobTable
