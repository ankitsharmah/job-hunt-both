import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useSelector } from 'react-redux';
// import { setLoggedin } from '../redux/authSlice';
const Navbar = () => {
    const [profile, setProfile] = useState(true);
    const isLoggedin=useSelector(state=>state.auth.loggedin)
    const user=isLoggedin;

console.log(user)
    function handleProfile() {
        setProfile(prev => !prev);
    }

    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <h1 className='text-2xl font-bold'>Job <span className='text-[#F82002]'>Hunt</span></h1>
                </div>

                <div className='flex gap-10'>
                    <ul className='flex font-medium items-center gap-5'>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/jobs">Jobs</Link></li>
                        <li><Link to="/browse">Browse</Link></li>
                    </ul>

                   
                   {
                    !user?(<div className=''>
                        <button className='mr-1  outline outline-1 outline-slate-300 px-2 py-1 rounded-md text-black hover:bg-slate-100'  ><Link to={"/login"}>Login</Link></button>
                        <button className='bg-[#6A38C2] hover:bg-[#5b30a6] px-2 py-1 rounded-md text-white '>
                                    <Link to={"/register"}>Register</Link>
                                </button>

                    </div>):(
                        <div className='relative ' onClick={handleProfile}>
                        <img
                            src="https://avatars.githubusercontent.com/u/132656164?s=400&u=da0534e97789ff4c6d62e24f1d3b3d57d7631ec3&v=4"
                            alt=""
                            className='w-12 h-12 cursor-pointer rounded-full bg-contain'
                        />

                        <div className={`${profile ? 'hidden' : 'absolute'} bg-slate-200 w-72 right-0 translate-y-2`}>
                            <div className='bg-slate-200 absolute h-4 w-4 right-4 top-0 transform -translate-y-2 rotate-45'></div>
                            <div className='p-2 flex items-center justify-around'>
                                <img
                                    src="https://avatars.githubusercontent.com/u/132656164?s=400&u=da0534e97789ff4c6d62e24f1d3b3d57d7631ec3&v=4"
                                    alt=""
                                    className='w-12 h-12 cursor-pointer rounded-full bg-contain'
                                />
                               <div>
                               <h2 className='text-xl font-semibold text-stone-00'>Ankit sharma</h2>
                                <p className='text-xs'>Lorem ipsum dolor sit amet cons</p>
                               </div>
                            </div>
                            <div className=' flex justify-around  flex-col gap-2 p-4'>
                                <button className="underline flex gap-4 pl-4">
                                <FaRegUser className=' text-2xl  text-slate-600'/>
                                <Link to={"/profile"}>View Profile</Link>
                                </button>
                                <button className="underline flex gap-4 pl-4">
                                <FiLogOut className='text-2xl text-slate-600'/><Link to={"/logout"}>Log Out</Link>
                                </button>
                        </div>
                        </div>
                    </div>
                    )
                   }
                 
                </div>
            </div>
        </div>
    );
}

export default Navbar;
