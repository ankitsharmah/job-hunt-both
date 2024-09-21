import { setCreatingJob, setJobsByCompany } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constants';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

const CreateJob = () => {
  const {creatingJob,jobsByCompany} = useSelector(state=>state.jobs)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name, id } = useParams(); // No need to pass any argument to useParams
  const [job, setJob] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: 0,
    position: 0,
    companyId: id,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    // For experience and position, ensure only numbers are allowed
    if ((name === 'experience' || name === 'position') && isNaN(value)) {
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
      dispatch(setCreatingJob(true))
      const res = await axios.post(`${JOB_API_END_POINT}/add`,job,{withCredentials:true})
console.log(res.data)
      if(res.data.success){
        const updatedJobs = [...jobsByCompany,res.data.createdjob];

        dispatch(setJobsByCompany(updatedJobs))
        dispatch(setCreatingJob(false))
        navigate(`/admin/company/${name}/jobs/${id}`)
      }
      
    } catch (error) {
      console.log(error)
    }finally{
      dispatch(setCreatingJob(false))
    }
    // You can make an API call here with the job object
    console.log(job);
  }

  return (
    <div className="max-w-xl flex flex-col mx-auto p-3 my-10 shadow-2xl rounded-md">
      <div className="flex gap-2">
        <button onClick={()=>{navigate(`/admin/company/${name}/jobs/${id}`)}} className="flex bg-black font-semibold gap-2 items-center text-center rounded-md justify-center px-2 py-1 text-white">
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
            name="experience"
            className="p-2 rounded-md outline outline-1 outline-gray-500"
            onChange={handleChange}
            placeholder="Years of Experience"
            value={job.experience}
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

export default CreateJob;
