import React, { useEffect } from 'react'
import { FaSearch } from "react-icons/fa";
import CategoryCraousel from './CategoryCraousel';
import LatestJobs from './LatestJobs';
import Footer from './shared/Footer';
import useGetJobs from '@/hooks/useGetJobs';
import useKeepLoggedIn from '@/hooks/useKeepLoggedIn';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchJobByJobTitle } from '@/redux/jobSlice';

const Home = () => {

    const dispatch = useDispatch();
    const {user}=useSelector(state=>state.auth);
    const navigate=useNavigate();

      useEffect(() => {
        if(user?.role==='recruiter'){
          navigate("/admin/companies");
        }else{
          navigate("/");

        }
      },[user])


  useGetJobs();
  return (
    <div className='text-center'>
    <div className='flex flex-col gap-3 md:gap-5 my-10'>

      <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'> No. 1 Job Hunt Website</span>
      <h1 className='text-4xl md:text-5xl font-bold'>Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'> 
      Dream Jobs</span></h1>
    <p>
    Find your perfect Job across the world! 

    </p>

    <div className='flex w-[90%] md:w-[40%] shadow-lg border border-gray-200 pl-3 mt-2 rounded-full items-center gap-4 mx-auto'>
        <input type="text" 
        className='outline-none border-none  w-full'
            placeholder='find you  dream jobs'
            
            onChange={(e)=>{
              dispatch(setSearchJobByJobTitle(e.target.value));
            }}
           
        />
        <button className='rounded-r-full py-3 px-3 bg-[#6A38C2]'>
        <FaSearch className='h-5 w-5 text-white font-semibold'  onClick={()=>{
              navigate("/browse")
            }}/>

        </button>
    </div>

    </div>
     
    <CategoryCraousel/>
    <LatestJobs />
    <Footer />
    </div>
  )
}

export default Home;
