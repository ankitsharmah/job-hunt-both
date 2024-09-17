import { setLoading } from '@/redux/companySlice';
import { COMPANY_API_END_POINT } from '@/utils/constants';
import axios from 'axios';
import { ArrowLeft, Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
import { toast } from 'sonner';

const UpdateCompany = () => {
  const { id } = useParams("id");
  const {isLoading} = useSelector(state=>state.company)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [company, setCompany] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file:null
  });

  useEffect(() => {
    async function getCompany() {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/${id}`, {
          withCredentials: true,
        });
        console.log(res.data);

        if (res.data.success) {
          setCompany({
            name: res.data.company.name,
            description: res.data.company.description,
            website: res.data.company.website,
            location: res.data.company.location,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }

    getCompany();
  }, [id]);

  function handleChange(e) {
    console.log(company)
    setCompany((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   console.log(company)

  //       dispatch(setLoading(true));

  //       try {
  //         const formData = new FormData();
  //         formData.append("name",company.name)
  //         formData.append("description",company.description)
  //         formData.append("website",company.website)
  //         formData.append("location",company.location)
  //         if(company.file){
  //         formData.append("file",company.file)

  //         }
  //         const updated= axios.put(`${COMPANY_API_END_POINT}/update/${id}`,formData,{
  //           headers: {
  //               'Content-Type': 'multipart/form-data'
  //           },
  //           withCredentials: true
  //       });
          
  //         if(updated.data.success){

  //             toast.success("updated successfully");
  //             navigate("/admin/companies");
  //         }
          
  //       } catch (error) {
  //         console.log(error)
  //       }finally{
  //         dispatch(setLoading(false));
  //       }

  //   console.log(company); // Here you can handle form submission
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    dispatch(setLoading(true));
    
    try {
      const formData = new FormData();
      formData.append("name", company.name);
      formData.append("description", company.description);
      formData.append("website", company.website);
      formData.append("location", company.location);
      if (company.file) {
        formData.append("file", company.file);
      }
      

      
  
      const updated = await axios.put(`${COMPANY_API_END_POINT}/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
  
      if (updated.data.success) {
        toast.success("Updated successfully");
        navigate("/admin/companies");
      }
  
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  




  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    console.log(file)
    setCompany({ ...company, file })
}

  return (
    <div className="max-w-xl flex flex-col mx-auto p-3 my-10 shadow-2xl rounded-md">
      <div className="flex gap-2">
        <button className="flex bg-black font-semibold gap-2 items-center text-center rounded-md justify-center px-2 py-1 text-white">
          <ArrowLeft className="font-semibold text-white" /> <Link to={"/admin/companies"}>Back</Link>
        </button>
        <h1 className="font-semibold text-xl">Company Setup</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex justify-center items-center flex-wrap p-3 gap-6 mt-4">
        <div className="flex flex-col w-[45%]">
          <label htmlFor="name" className="text-base">Company Name</label>
          <input
            type="text"
            name="name"
            className="p-2 rounded-md outline outline-1 outline-gray-500"
            onChange={handleChange}
            placeholder="Company name"
            value={company.name}
          />
        </div>

        <div className="flex flex-col w-[45%]">
          <label htmlFor="description" className="text-base">Description</label>
          <input
            type="text"
            name="description"
            className="p-2 rounded-md outline outline-1 outline-gray-500"
            onChange={handleChange}
            placeholder="Description"
            value={company.description}
          />
        </div>

        <div className="flex flex-col w-[45%]">
          <label htmlFor="website" className="text-base">Website</label>
          <input
            type="text"
            name="website"
            className="p-2 rounded-md outline outline-1 outline-gray-500"
            onChange={handleChange}
            placeholder="Website"
            value={company.website}
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
            value={company.location}
          />
        </div>

        <div className="flex flex-col w-[45%]">
          <label htmlFor="logo">Logo</label>
          <input type="file" className="outline outline-1 rounded-md" value={company.logo} onChange={fileChangeHandler}/>
        </div>

        <button type="submit" className="bg-green-400  flex justify-center items-center px-2 py-1 rounded-md text-white">
          {
            isLoading?(<p>
              <Loader2 className='mr-2 h-5 w-5 animate-spin' />
               updating
            </p>):(<p>
              submit
            </p>)
          }
        </button>
      </form>
    </div>
  );
};

export default UpdateCompany;
