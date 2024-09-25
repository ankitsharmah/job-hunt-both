import React, { useEffect } from 'react'
import { USER_API_END_POINT } from '@/utils/constants';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setLoggedin, setLoggedInUser } from '@/redux/authSlice';

function useKeepLoggedIn() {
    const dispatch = useDispatch();
    useEffect(() => {
      const checkUserAuth = async () => {
        console.log("checking")
        try {
          // Make a request to backend to verify user from the cookie
          const res = await axios.get(`${USER_API_END_POINT}/auth/check`, { withCredentials: true });
          if (res.data.success) {
            // If the user is authenticated, store the user data in Redux
            dispatch(setLoggedin(true));
            dispatch(setLoggedInUser(res.data.user));
          }
        } catch (error) {
          console.log(error);
        }
      };
      
      checkUserAuth();
    }, [dispatch]);
}

export default useKeepLoggedIn
