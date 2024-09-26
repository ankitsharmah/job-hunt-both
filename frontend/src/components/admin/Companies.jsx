import { MoreHorizontal } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import CompaniesTable from './CompaniesTable';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCompany, setCompanyName, setLoading } from '@/redux/companySlice';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constants';

const Companies = () => {
  const dispatch = useDispatch();
  const {searchBycompanyName,isLoading} = useSelector(state=>state.company);
  const [name, setName] = useState(searchBycompanyName); 

  useEffect(()=>{

   async function getCompany(){
    dispatch(setLoading(true))

        try {
            const res = await axios.get(`${COMPANY_API_END_POINT}/`,{withCredentials:true})
            if(res.data.success){
                dispatch(setCompany(res.data.companies))
                dispatch(setLoading(false))
            }
    
        } catch (error) {
            console.log(error)
        }finally{
          dispatch(setLoading(false))

        }
    }
        getCompany()
  },[])

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    dispatch(setCompanyName(newName)); // Dispatch action with the updated name
  };

  return (
    <div className='max-w-6xl mx-auto my-6'>
      <div className='flex justify-between'>
        <input
          type="text"
          placeholder='hello'
          className='outline w-fit'
          onChange={handleNameChange} // Use the handler function
          value={name} // Make sure input is controlled
        />
        <button className='bg-black text-white py-1 px-2 rounded-md'>
          <Link to="/admin/companies/create">New company</Link>
        </button>
      </div>
      <CompaniesTable />
    </div>
  );
};

export default Companies;
