import React, { useEffect, useState } from 'react'
// import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
// import AppliedJobTable from './AppliedJobTable'
// import UpdateProfileDialog from './UpdateProfileDialog'
import { useDispatch, useSelector } from 'react-redux'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constants'
import { setAppliedJobs, setGettingAppliedJobs } from '@/redux/jobSlice'
// import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

// const skills = ["Html", "Css", "Javascript", "Reactjs"]
const isResume = true;

const Profile = () => {
    // useGetAppliedJobs();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const {user} = useSelector(store=>store.auth);
    // const [applied,setApplied] = useState(user);
    // const {appliedJobs}=useSelector(state=>state.jobs);

    const{loggedin}=useSelector(state=>state.auth)
    useEffect(()=>{
        async function getApplied(){
            dispatch(setGettingAppliedJobs(true))
                    try {
                        const response = await axios.get(`${APPLICATION_API_END_POINT}/get-applied-job`,{withCredentials:true});
                        // console.log("setting data ",response.data.message)
                        if(response.data.success){
                            // setApplied(response.data.applications)
                            dispatch(setAppliedJobs(response.data.application        
                                
                                                ))
            dispatch(setGettingAppliedJobs(false))

                        }
                } catch (error) {
                    console.log(error)
                }finally{
            dispatch(setGettingAppliedJobs(false))

                }
                 }
                 getApplied();
    },[dispatch])

    return (
        <>
            {
              loggedin &&      
               <div>
               <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-24 w-24 ">
                            <AvatarImage src={user?.profile?.profilePhoto} alt="profile"  />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="text-right" variant="outline"><Pen /></Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h1>Skills</h1>
                    <div className='flex items-center gap-1'>
                        {
                            user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>NA</span>
                        }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className="text-md font-bold">Resume</Label>
                    {
                        isResume ? <a target='blank' href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
                    }
                </div>
            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                {/* Applied Job Table   */}
                <AppliedJobTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
               </div>
            }
        </>
    )
}

export default Profile