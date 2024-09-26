import express from 'express';
import { login, logOut, register, updateProfile } from '../controllers/user.controllers.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { singleUpload } from '../middlewares/multer.js';
import jwt from "jsonwebtoken";
import { User } from '../models/user.model.js';

const router = express.Router();

router.post('/register',singleUpload, register);
router.post('/login', login);
router.get("/logout",logOut)
router.post('/profile/update',isAuthenticated,singleUpload,updateProfile)
router.get('/auth/check', async(req, res) => {
    const token = req.cookies.token; // Get token from the cookie
    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY); // Verify token
            const userId=decoded.userId;
      let user =await User.findOne({_id:userId});
      if(!user){
          return res.status(404).json({
              message:"incorrect emailor password",
              success:false
          })
      }
      // Send back the user info if token is valid
      res.json({ success: true, user: user });
    } catch (error) {
      res.status(401).json({ success: false, message: 'Invalid token' });
    }

  });

  
export default router;
