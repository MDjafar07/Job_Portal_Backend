import express from 'express';
import { loginController, registerController } from '../controllers/authController.js';

const router = express.Router();

//Login
router.post('/login', loginController);
//Registration
router.post('/register', registerController);


export default router;
