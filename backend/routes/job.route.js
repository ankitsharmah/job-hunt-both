import express from 'express';
import { getJobByCompanyId, getJobByCompanyName, getJobById, getJobPostedByAdmin, postJob } from '../controllers/job.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.post('/add', isAuthenticated, postJob);
router.get("/company/:companyId",getJobByCompanyId)
router.get("/job/:jobId",getJobById)
router.get("/company/:companyname",getJobByCompanyName);
router.get("/admin",isAuthenticated,getJobPostedByAdmin);
export default router;