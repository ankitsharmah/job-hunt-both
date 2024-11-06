import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constants';
import Loader from './Loader';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.jobs);
    const { loggedin, user } = useSelector(store => store.auth);
    
    const [isApplied, setIsApplied] = useState(false); // Initialize application status
    const [loadingDesc, setLoadingDesc] = useState(false); // Loading state for job description
    const [loadingApply, setLoadingApply] = useState(false); // Loading state for apply action

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        setLoadingApply(true); // Set loading state when apply button is clicked
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/add/${jobId}`, { withCredentials: true });
            
            if (res.data.success) {
                setIsApplied(true); // Update the local state
                const updatedSingleJob = {
                    ...singleJob,
                    applications: [...singleJob.applications, { applicant: user?._id }]
                };
                dispatch(setSingleJob(updatedSingleJob)); // Helps to update the UI in real-time
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "An error occurred.");
        } finally {
            setLoadingApply(false); // Reset loading state after request is complete
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            setLoadingDesc(true);
            
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id));
                }
            } catch (error) {
                console.log(error);
                toast.error("Failed to fetch job details.");
            } finally {
                setLoadingDesc(false);
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <div>
            {!loggedin ? (
                <div>Please login first</div>
            ) : (
                loadingDesc ? (
                    <div className='h-[88vh]'>

                    <Loader />
                    </div>
                ) : (
                    <div className='max-w-7xl w-[95%] outline p-2 rounded-md outline-[0.2px] outline-gray-200 shadow-md mx-auto my-10'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
                                <div className='flex items-center gap-2 mt-4'>
                                    <Badge className='text-blue-700 font-bold' variant="ghost">{singleJob?.position} Positions</Badge>
                                    <Badge className='text-[#F83002] font-bold' variant="ghost">{singleJob?.jobType}</Badge>
                                    <Badge className='text-[#7209b7] font-bold' variant="ghost">{singleJob?.salary}LPA</Badge>
                                </div>
                            </div>
                            <div className='hidden md:block'>

                            {loadingApply ? (
                                <Loader /> // Show loader when the apply button is clicked
                            ) : (
                                <Button
                                    onClick={isApplied ? null : applyJobHandler}
                                    disabled={isApplied || loadingApply}
                                    className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}
                                >
                                    {isApplied ? 'Already Applied' : 'Apply Now'}
                                </Button>
                            )}
                            </div>
                        </div>
                        <h1 className='border-b md:border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
                        <div className='my-4'>
                            <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                            <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                            <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
                            <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experienceLevel} yrs</span></h1>
                            <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary}LPA</span></h1>
                            <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
                            <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>
                        </div>
                        <div className='text-center md:hidden'>

                            {loadingApply ? (
                                <Loader /> // Show loader when the apply button is clicked
                            ) : (
                                <Button
                                    onClick={isApplied ? null : applyJobHandler}
                                    disabled={isApplied || loadingApply}
                                    className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}
                                >
                                    {isApplied ? 'Already Applied' : 'Apply Now'}
                                </Button>
                            )}
                            </div>
                   
                    </div>

                )
            )}
        </div>
    );
};

export default JobDescription;
