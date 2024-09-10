import express from 'express';
import { login, register, updateProfile } from '../controllers/user.controllers.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { singleUpload } from '../middlewares/multer.js';

const router = express.Router();

router.post('/register',singleUpload, register);
router.post('/login', login);
router.post('/profile/update',isAuthenticated,singleUpload,updateProfile)

export default router;
