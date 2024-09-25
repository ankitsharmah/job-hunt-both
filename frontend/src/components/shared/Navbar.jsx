import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useSelector, useDispatch } from 'react-redux';
import useKeepLoggedIn from '@/hooks/useKeepLoggedIn';
import useGetJobs from '@/hooks/useGetJobs';
import { USER_API_END_POINT } from '@/utils/constants';
import { toast } from 'sonner';
import axios from 'axios';
import { setLoggedin, setLoggedInUser } from '@/redux/authSlice';  // Uncomment this line

const Navbar = () => {
    useKeepLoggedIn();
    useGetJobs();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(true);
    const dispatch = useDispatch();
    
    const isLoggedin = useSelector(state => state.auth.loggedin);
    const image = useSelector(state => state.auth.user);


    async function logOut() {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                toast.success(res.data.message);
                // Update Redux state
                dispatch(setLoggedin(false));
                dispatch(setLoggedInUser(null));
                
                // Navigate to home page after logout
                navigate('/');
            } else {
                toast.error("Logout failed");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred during logout.");
        }
    }

    function handleProfile() {
        setProfile(prev => !prev);
    }

    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div onClick={()=>navigate("/")} className='cursor-pointer'>
                    <h1 className='text-2xl font-bold'>Job <span className='text-[#F82002]'>Hunt</span></h1>
                </div>

                <div className='flex gap-10'>
                    <ul className='flex font-medium items-center gap-5'>
                       {
                        image?.role==="recruiter" ? (
                            <>
                            <li><Link to="/admin/companies">Home</Link></li>
                            <li><Link to="/admin/jobs">Jobs</Link></li>
                            </>
                        ):(
                            <>
                            <li><Link to="/">Home</Link></li>
                        <li><Link to="/jobs">Jobs</Link></li>
                        <li><Link to="/browse">Browse</Link></li>
                            </>
                        )
                       }
                    </ul>

                    {!isLoggedin ? (
                        <div className=''>
                            <button className='mr-1 outline outline-1 outline-slate-300 px-2 py-1 rounded-md text-black hover:bg-slate-100'>
                                <Link to="/login">Login</Link>
                            </button>
                            <button className='bg-[#6A38C2] hover:bg-[#5b30a6] px-2 py-1 rounded-md text-white '>
                                <Link to="/register">Register</Link>
                            </button>
                        </div>
                    ) : (
                        <div className='relative' onClick={handleProfile}>
                            <img
                                src={image?.profile?.profilePhoto}
                                alt=""
                                className='w-12 h-12 cursor-pointer rounded-full'
                            />

                            <div className={`${profile ? 'hidden' : 'absolute'} z-10 rounded-xl bg-slate-100 shadow-lg w-72 right-0 translate-y-2`}>
                                <div className='bg-slate-100 absolute h-4 w-4 right-4 top-0 transform -translate-y-2 rotate-45'></div>
                                <div className='p-2 flex items-center justify-around'>
                                    <img
                                        src={image?.profile?.profilePhoto}
                                        alt=""
                                        className='w-12 h-12 cursor-pointer rounded-full '
                                    />
                                    <div className='text-center w-[60%] '>
                                        <h2 className='text-xl font-semibold text-left '>{image?.fullname}</h2>
                                        <p className='text-sm text-left'>{image?.profile?.bio}</p>
                                    </div>
                                </div>
                                <div className='flex justify-around flex-col gap-2 p-4'>
                                   {
                                    image && image?.role==='student' &&  (<button className="text-black font-semibold underline flex gap-4 pl-4">
                                        <FaRegUser className='text-2xl text-black' />
                                        <Link to="/profile">View Profile</Link>
                                    </button>)
                                   }
                                    <button className="underline flex gap-4 pl-4 font-semibold text-black" onClick={logOut}>
                                        <FiLogOut className='text-2xl text-black' />Log Out
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
