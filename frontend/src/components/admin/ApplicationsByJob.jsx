import React, { useEffect } from 'react'
import ApplicationsByJobTable from './ApplicationsByJobTable'
import { useParams } from 'react-router-dom'
import { APPLICATION_API_END_POINT } from '@/utils/constants';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setApplications } from '@/redux/applicationSlice';

const ApplicationsByJob = () => {

  const {jobname,id} = useParams();
  const dispatch = useDispatch();
  const no =2;
  const { applications } = useSelector(state => state.application);

    useEffect(()=>{
      async function getApplication(){
        try {
          const res = await axios.get(`${APPLICATION_API_END_POINT}/get-applicants/${id}`,{withCredentials:true});

          console.log(res.data.job)
          if(res.data.success){
    
            dispatch(setApplications(res.data.job));
          }

        } catch (error) {
          console.log(error)
        }
      }

      getApplication()
    },[])

  return (
    <div className='max-w-7xl mx-auto my-10'>
    <div>
      <h1>
        Job title : {
          jobname
        }
      </h1>
      <p>
       Aplications ({
          applications?.applications?.length
        })
      </p>
    </div>
     <ApplicationsByJobTable />
    </div>
  )
}

export default ApplicationsByJob
