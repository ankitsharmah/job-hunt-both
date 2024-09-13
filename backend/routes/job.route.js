import express from 'express';
import { getAllJobs, getJobByCompanyId, getJobByCompanyName, getJobById, getJobPostedByAdmin, postJob } from '../controllers/job.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.post('/add', isAuthenticated, postJob);
router.get("/get",isAuthenticated, getAllJobs);
router.get("/company/:companyId",getJobByCompanyId)
router.get("/get/:jobId",getJobById)
router.get("/company/:companyname",getJobByCompanyName);
router.get("/admin",isAuthenticated,getJobPostedByAdmin);
export default router;