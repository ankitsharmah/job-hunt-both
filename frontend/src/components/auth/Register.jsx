import React, { useState } from 'react';
// import Navbar from '../shared/Navbar';
import { Link, useNavigate } from 'react-router-dom';
// import { USER_API_END_POINT } from '../../../../../job porta/frontend/src/utils/constants';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../redux/authSlice';
import { USER_API_END_POINT } from '@/utils/constants';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loading=useSelector(state=>state.auth.loading);
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
        phoneNumber: '',
        role: "",
        file: ""
    });

    const fileChangeHandler = (e) => {
        setFormData({
            ...formData,
            file: e.target.files?.[0]
        });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataa = new FormData(); 
        formDataa.append("fullname", formData.fullname);
        formDataa.append("email", formData.email);
        formDataa.append("phoneNumber", formData.phoneNumber);
        formDataa.append("password", formData.password);
        formDataa.append("role", formData.role);
        if (formData.file) {
            formDataa.append("file", formData.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formDataa, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                // alert("Registered successfully");
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
        }
        finally{
            dispatch(setLoading(false))
        }
        console.log('Form Data:', formData);
    };

    return (
        <div>
           
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                {loading ? (<div className='flex items-center justify-center w-full h-[88vh] bg-yellow-50'>
                    <h1 className='text-4xl'>
                        Loading...
                    </h1>
                </div>):(<form onSubmit={handleSubmit} className='w-1/2 border cursor-pointer flex flex-col my-10 items-center border-gray-200 rounded-md'>
                    <h1 className='text-xl font-bold self-start p-6'>Sign up</h1>

                    <div className="mb-2 w-11/12">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="fullname"
                            value={formData.fullname}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#6A38C2] focus:border-[#6A38C2] sm:text-sm"
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
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#6A38C2] focus:border-[#6A38C2] sm:text-sm"
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
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#6A38C2] focus:border-[#6A38C2] sm:text-sm"
                            required
                        />
                    </div>

                    <div className="mb-2 w-11/12">
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                            Phone number: 
                        </label>
                        <input
                            type="text"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#6A38C2] focus:border-[#6A38C2] sm:text-sm"
                            required
                        />
                    </div>

                    <div className='flex justify-between w-11/12 items-center'>
                        <div className='flex gap-2'>
                            <input type="radio" value="student"
                            onChange={handleChange}
                            name='role' className='cursor-pointer' id='r1' />
                            <label htmlFor="r1" className='block  text-sm font-medium text-gray-700'>Student</label>
                            <input type="radio"
                            name='role'
                            onChange={handleChange}
                            value="recruiter"
                            id='r2' className='ml-2 cursor-pointer'/>
                            <label htmlFor="r2" className='block text-sm font-medium text-gray-700'>Recruiter</label>
                        </div>

                        <div>
                            <input type="file" className='bg-white' onChange={fileChangeHandler} name='file'/>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="self-start ml-6 my-3 bg-slate-800 text-white w-11/12 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Register
                    </button>
                    <Link to={"/login"} className='self-start p-2'>
                        have an account? <span className='text-cyan-300'>Login</span>
                    </Link>
                </form>)

                }
            </div>
        </div>
    );
}

export default Register;
