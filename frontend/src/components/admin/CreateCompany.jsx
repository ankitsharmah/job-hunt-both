import { setLoading } from '@/redux/companySlice';
import { setCompany } from '@/redux/companySlice';
import { COMPANY_API_END_POINT } from '@/utils/constants';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// import { Toast } from '../ui/toast';
import { toast } from 'sonner';

const CreateCompany = () => {
  const [cName, setCname] = useState("");
  const navigate=useNavigate()
  // Destructure companies and isLoading correctly from state
  const { companies, isLoading } = useSelector(state => state.company);
  console.log(isLoading)
  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(cName);

    try {
      dispatch(setLoading(true)); // Start loading
      console.log("this is came", cName, " ", companies);

      const res = await axios.post(`${COMPANY_API_END_POINT}/add`, { companyName: cName }, { withCredentials: true });
      console.log(res.data);

      if(res.data.exists){
        alert(`company ${cName} already exists`)
      }
      


      if (res.data.success) {
        // Create a new array with the updated company list
        console.log(res.data)
        const newCompanies = [...companies, cName];

        console.log(newCompanies);
        dispatch(setCompany(newCompanies));  // Update the companies array in state
        
        toast("Event has been created", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
        
        navigate(`/admin/companies/${res.data.company._id}`);
      }
    } catch (error) {
      console.log(error);
      if(res.data.exists){
        alert("company already exists")
      }
    } finally {
      dispatch(setLoading(false));  // Stop loading
    }
  }

  return (
    <div className='max-w-4xl mx-auto my-10 flex flex-col '>
        <h2 className='font-bold text-2xl'>Your Company Name</h2>
        <p className='text-gray-600'>what would you like to give your company name? you can change it later</p>
      <div className='mt-7 flex gap-7  items-center '>
     <div className='flex flex-col w-[50%]'>
     <label htmlFor="">company name</label>
      <input
        type="text"
        className='outline outline-1 rounded-sm w-[100%] p-2 '
        id='name'
        placeholder="please enter company name"
        onChange={(event) => setCname(event.target.value)}  // Correct onChange handler
        disabled={isLoading}  // Disable input while loading
      />
     </div>
     
      </div>
      <div className='flex gap-4 h-9 my-3'>
     <button className='bg-red-500 py-1 px-2 text-white rounded-md '>
        <Link to={"/admin/companies"}>cancel</Link>
      </button>
      <button className='bg-green-500 py-1 px-2 text-white rounded-md ' onClick={handleSubmit} disabled={isLoading}> 
        { 
          isLoading ? (<span>Creating...</span>) : (<span>Submit</span>)  // Show loader text when isLoading is true
        }
      </button>
     </div>
    </div>
  );
}

export default CreateCompany;
