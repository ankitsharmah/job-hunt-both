import { setCreatingJob, setJobsByCompany, setSingleJob } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constants';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditJob = () => {
  const {creatingJob,jobsByCompany,singleJob} = useSelector(state=>state.jobs)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name, id } = useParams(); // No need to pass any argument to useParams
  const [job, setJob] = useState({ 
              title:singleJob?.title || "",
              description:singleJob?.description || "",
              requirements: singleJob?.requirements || "",
              salary: singleJob?.salary || "",
              location: singleJob?.location || "",
              jobType: singleJob?.jobType || "",
              experience: singleJob?.experienceLevel || 0,
              position: singleJob?.position || 0,
              companyId: singleJob?.company||"asdasd",
            });

  useEffect(()=>{

    async function getJob(){
      try {

        const res = await axios.get(`${JOB_API_END_POINT}/get/${id}`,{withCredentials:true});

        if(res.data.success){
          console.log("this is single job ",res.data.job)
          setJob({
            title:res.data.job?.title || "",
            description:res.data.job?.description || "",
            requirements: res.data.job?.requirements || "",
            salary: res.data.job?.salary || "",
            location: res.data.job?.location || "",
            jobType: res.data.job?.jobType || "",
            experienceLevel: res.data.job?.experienceLevel || 0,
            position: res.data.job?.position || 0,
            companyId:res.data.job?.company ,
          })
          dispatch(setSingleJob(res.data.job))
        }
        
      } catch (error) {
        console.log(error)
      }
    }
    getJob();
    
  },[id])

  function handleChange(e) {
    const { name, value } = e.target;
    // For experience and position, ensure only numbers are allowed
    if ((name === 'experienceLevel' || name === 'position') && isNaN(value)) {
      return; // Do nothing if non-numeric input is detected
    }

    setJob((prev) => ({
      ...prev,
      [name]: value,
    }));

    // console.log({ [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      console.log("creating")
      const res = await axios.put(`${JOB_API_END_POINT}/update/${id}`,job,{withCredentials:true})
      console.log("comp is updated : ",res.data)
      if(res.data.success){
        // const updatedJobs = [...jobsByCompany,res.data.updatedJob];

        // dispatch(setJobsByCompany(updatedJobs))
        // dispatch(setCreatingJob(false))
        console.log("com idddddd ",res.data.updatedJob.company)
        navigate(`/admin/company/${name}/jobs/${res.data.updatedJob.company}`)
      }
      
    } catch (error) {
      console.log(error)
    }
    // You can make an API call here with the job object
    console.log(job);
  }

  return (
    <div className="max-w-xl flex flex-col mx-auto p-3 my-10 shadow-2xl rounded-md">
      <div className="flex gap-2">
        <button onClick={()=>{navigate(`/admin/company/${name}/jobs/${singleJob.company._id}`)}} className="flex bg-black font-semibold gap-2 items-center text-center rounded-md justify-center px-2 py-1 text-white">
          <ArrowLeft className="font-semibold text-white" />
          <Link>Back</Link>
        </button>
        <h1 className="font-semibold text-xl">Job Details</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex justify-center items-center flex-wrap p-3 gap-6 mt-4">
        <div className="flex flex-col w-[45%]">
          <label htmlFor="title" className="text-base">Title</label>
          <input
            type="text"
            name="title"
            className="p-2 rounded-md outline outline-1 outline-gray-500"
            onChange={handleChange}
            placeholder="Job Title"
            value={job.title}
          />
        </div>

        <div className="flex flex-col w-[45%]">
          <label htmlFor="description" className="text-base">Description</label>
          <input
            type="text"
            name="description"
            className="p-2 rounded-md outline outline-1 outline-gray-500"
            onChange={handleChange}
            placeholder="Job Description"
            value={job.description}
          />
        </div>

        <div className="flex flex-col w-[45%]">
          <label htmlFor="requirements" className="text-base">Requirements</label>
          <input
            type="text"
            name="requirements"
            className="p-2 rounded-md outline outline-1 outline-gray-500"
            onChange={handleChange}
            placeholder="Job Requirements"
            value={job.requirements}
          />
        </div>

        <div className="flex flex-col w-[45%]">
          <label htmlFor="salary" className="text-base">Salary</label>
          <input
            type="text"
            name="salary"
            className="p-2 rounded-md outline outline-1 outline-gray-500"
            onChange={handleChange}
            placeholder="Salary"
            value={job.salary}
          />
        </div>

        <div className="flex flex-col w-[45%]">
          <label htmlFor="location" className="text-base">Location</label>
          <input
            type="text"
            name="location"
            className="p-2 rounded-md outline outline-1 outline-gray-500"
            onChange={handleChange}
            placeholder="Location"
            value={job.location}
          />
        </div>

        <div className="flex flex-col w-[45%]">
          <label htmlFor="jobType" className="text-base">Job Type</label>
          <input
            type="text"
            name="jobType"
            className="p-2 rounded-md outline outline-1 outline-gray-500"
            onChange={handleChange}
            placeholder="Full-time, Part-time, etc."
            value={job.jobType}
          />
        </div>

        <div className="flex flex-col w-[45%]">
          <label htmlFor="experience" className="text-base">Experience <span className='font-thin text-sm'>(in years)</span></label>
          <input
            type="number"
            name="experienceLevel"
            className="p-2 rounded-md outline outline-1 outline-gray-500"
            onChange={handleChange}
            placeholder="Years of Experience"
            value={job.experienceLevel}
          />
        </div>

        <div className="flex flex-col w-[45%]">
          <label htmlFor="position" className="text-base">No. of Positions</label>
          <input
            type="number"
            name="position"
            className="p-2 rounded-md outline outline-1 outline-gray-500"
            onChange={handleChange}
            placeholder="Number of Positions"
            value={job.position}
          />
        </div>

        <button type="submit" className="bg-green-400 flex justify-center items-center px-2 py-1 rounded-md text-white">
          {
            creatingJob? (<span>creating...</span>):(<span>Submit</span>)
          }
        </button>
      </form>
    </div>
  );
};

export default EditJob;
