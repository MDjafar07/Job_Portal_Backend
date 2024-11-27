import express from 'express';
import userAuth from '../middelwares/authMiddelware.js';
import { creatJobController, deleteJobsController, getAllJobsController, jobsStatsController, updateJobsController } from '../controllers/jobsController.js';


const router = express.Router();
//==================Create Jobs===================
router.post('/create', userAuth, creatJobController);
//================Get All The Jobs====================
router.get('/getJobs', userAuth, getAllJobsController);
//===================Update Jobs=======================
router.patch('/updateJobs/:id', userAuth, updateJobsController);
//===================Delete Jobs========================
router.delete('/delete/:id', userAuth, deleteJobsController);
//===================Jobs Stats========================
router.get('/job-stats', userAuth, jobsStatsController);


export default router;
