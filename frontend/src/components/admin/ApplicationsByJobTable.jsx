import { Popover, PopoverContent ,PopoverTrigger} from '@radix-ui/react-popover';
import { CircleX, Edit2, EyeIcon, Loader2, MoreHorizontal, WormIcon, Zap } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { useDispatch, useSelector } from 'react-redux';
// import Companies from './Companies';  // Assuming this imports default company data for fallback
import { useNavigate, useParams } from 'react-router-dom';
import { Badge } from '../ui/badge';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constants';
import { setApplications, setLoadingApplications } from '@/redux/applicationSlice';
import { toast } from 'sonner';
import Loader from '../Loader';
import { Button } from '../ui/button';
const ApplicationsByJobTable = () => {
  const {jobname,id}=useParams()
  const { applications,lodaingApplications } = useSelector(state => state.application);
  const[statusLoader,setStatusLoader] = useState(false);
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
        setStatusLoader(true);
        try {
      
          // Send the status update to the backend
          const res = await axios.post(
            `${APPLICATION_API_END_POINT}/update/application/${actions.jobId}`,
            { status: actions.status },
            { withCredentials: true }
          );
      
          if (res.data.success) {
            toast.success("status updated");
            const updatedApplications = applications?.applications?.map((application) => {
              // If the application id matches the one in actions, update the status
              if (application._id === actions.jobId) {
                return {
                  ...application,
                  status: actions.status // Update the status
                };
              }
              // Otherwise, return the original application object unchanged
              return application;
            });
            const updatedJob = {
              ...applications,
              applications: updatedApplications
            }
            // Dispatch the updated applications to the state/store
            dispatch(setApplications(updatedJob));
            setStatusLoader(false);
            setStatusLoader(false);

          }
        } catch (error) {
          console.log(error);
        }finally{
            setStatusLoader(false);

        }
      }
      
        
      
    
  return (
    <div>
          <Table>
        <TableCaption>{lodaingApplications ? <Loader />:<p>A list of Applicants for {jobname}</p>}</TableCaption>
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
          {!lodaingApplications && applications?.applications && applications?.applications.map(applicant => (
            <TableRow key={applicant._id} className={"cursor-pointer"}>
           
              <TableCell >{applicant.applicant.fullname}</TableCell>
              <TableCell >{applicant.applicant.email}</TableCell>
              <TableCell >{applicant.applicant.phoneNumber}</TableCell>
              <TableCell >{
                applicant.applicant.profile.resumeOriginalName? (<a href={applicant.applicant.profile.resume} target='_blank' className='text-cyan-400'>{applicant.applicant.profile.resumeOriginalName}</a>):(<span>NA</span>)
              }</TableCell>
              <TableCell >{new Date(applicant.createdAt).toLocaleDateString()}</TableCell>
              <TableCell ><Badge className={applicant.status==="rejected"  ? "bg-red-600 hover:bg-red-500":applicant.status === "pending" ? "bg-gray-400 ":" bg-green-500 hover:bg-green-400"}>{applicant.status}</Badge></TableCell>
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
                        handleUpdateStatus(updatedAction);
                      }} 
                      className="flex items-center gap-2 w-full text-white px-2 py-1 rounded-md bg-green-400 cursor-pointer"
                    >
                   {
                    statusLoader ? <div> <button className="w-full flex "> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </button> </div>:  <div className='felx w-full items-center justify-center'> <button className="w-full flex items-center justify-center gap-2 "> 
                    <Zap className="w-4 h-4" />Reject
                    </button> 
                  </div> 
                   }
                    </div>

                    <div 
                      data-name="rejected" 
                      onClick={(e) => {
                        const updatedAction = {
                          status: e.currentTarget.dataset.name,
                          jobId: applicant._id
                        };
                        setAction(updatedAction);
                        handleUpdateStatus(updatedAction);
                      }} 
                      className="flex items-center bg-[#f13a3a] px-2 py-1 w-[100%] rounded-md text-white gap-2 cursor-pointer"
                    >
                     {
                    statusLoader ? <div>  <button className="w-full flex "> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </button> </div>: <div className='felx w-full items-center justify-center'> <button className="w-full flex items-center justify-center gap-2 "> 
                    <CircleX className="w-4 h-4" />Reject
                    </button> 
                  </div> 
                   }
                     
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
