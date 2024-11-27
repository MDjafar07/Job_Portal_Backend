import express from 'express';
import { paginationsController } from '../controllers/paginationsController.js';

const router = express.Router();

router.get('/getUser', paginationsController);


export default router;