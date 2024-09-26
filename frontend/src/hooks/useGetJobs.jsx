import { setAllJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constants'
import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux'


const useGetJobs = async() => {
    const dispatch = useDispatch();
                try {

                    const response = await axios.get(`${JOB_API_END_POINT}/get`,{withCredentials:true});
                    
                    if(response.data.success){
                            dispatch(setAllJobs(response.data.jobs));
                    }
                    
                } catch (error) {
                    console.log(error)
                }
                }

export default useGetJobs;
