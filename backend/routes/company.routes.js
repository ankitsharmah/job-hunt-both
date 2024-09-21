import express from 'express';
import { deleteCompanyById, getCompany, getCompanyById, saveCompany, updateCompanyById } from '../controllers/company.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { singleUpload } from '../middlewares/multer.js';

const router= express.Router();


router.post('/add',isAuthenticated,saveCompany)
router.get('/',isAuthenticated,getCompany)
router.get('/:id',isAuthenticated,getCompanyById)
router.put('/update/:id',isAuthenticated,singleUpload,updateCompanyById)
router.delete('/delete/:id',isAuthenticated,deleteCompanyById)

export default router;