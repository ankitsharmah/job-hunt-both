import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
// import Navbar from '../../../../../job porta/frontend/src/shared/Navbar';
// import { USER_API_END_POINT } from '../../../../../job porta/frontend/src/utils/constants';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setLoggedin, setLoggedInUser } from '../../redux/authSlice';
import { USER_API_END_POINT } from '@/utils/constants';

const Login = () => {
    const dispatch = useDispatch()
    const navigate=useNavigate();
    const [formData,setFormData]= useState({
        name:"",
        email:"",
        password:"",
        role:""
    })
    
    const loading = useSelector(state=>state.auth.loading)

    console.log(loading)

    function handleChange(e){
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            })
    }

   async function handleSubmit(e){
        e.preventDefault();

        try {
            dispatch(setLoading(true))
            console.log(loading)
            const respose = await axios.post(`${USER_API_END_POINT}/login`,formData, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            })
            
            if(respose.data.success){
                console.log(respose.data)
                alert(respose.data.message)
                dispatch(setLoggedInUser(respose.data.user))
                dispatch(setLoggedin(true))
                localStorage.setItem("user", respose.data.user);
                navigate("/")
            }
        } catch (error) {
            
            console.log(error)
        }
        finally{
                dispatch(setLoading(false));
        }

        console.log(formData)
    }
  return (
    <div>
    {/* <Navbar /> */}
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
      {loading ? (<div className='flex items-center justify-center w-full h-[88vh] bg-yellow-50'>
        <h1 className='text-4xl '>loading...</h1>
      </div>):(
        <form onSubmit={handleSubmit} className='w-1/2 border flex flex-col my-10 items-center border-gray-200 rounded-md'>
           <h1 className='text-xl font-bold self-start p-6'>Login</h1>
           
            <div className="mb-2 w-11/12">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#6A38C2] focus:border-[#6A38C2] "
                    required
                />
            </div>

            <div className="mb-2 w-11/12">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#6A38C2] focus:border-[#6A38C2] "
                    required
                />
            </div>

            <div className="mb-2 w-11/12">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#6A38C2] focus:border-[#6A38C2] "
                    required
                />
            </div>
          

            <div className='flex justify-between  w-11/12 items-center'>

                <div className='flex gap-2'>
                    <input type="radio" onChange={handleChange} value="student" name='role' 
                    id='r1' />
                   <label htmlFor="r1"
                  
                   className='block text-sm font-medium text-gray-700'> Student</label>
                    <input type="radio"
                    name='role'
                    onChange={handleChange} 
                    value="recruiter"
                    id='r2' className='ml-2'/>
                    <label htmlFor="r2" className='block text-sm font-medium text-gray-700'>Recruiter</label>

                </div>

       

            </div>

            <button
                type="submit"
                className=" self-start ml-6 my-3 bg-slate-800 text-white py-3 w-11/12 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                Login
            </button>
            <Link to={"/register"} className='self-start p-3'>
            dont have an account? <span className='text-cyan-300'>Register</span>
        </Link>
        </form>
      )

      }
      
      </div>
      

    </div>
  )
}

export default Login;
