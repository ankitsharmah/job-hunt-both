import express from 'express';
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from '../controllers/application.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js'
const router=express.Router();

router.get('/add/:id',isAuthenticated,applyJob)
router.get("/get-applied-job",isAuthenticated,getAppliedJobs)
router.get('/get-applicants/:id',getApplicants)
router.post('/update/application/:id',isAuthenticated,updateStatus)

export default router