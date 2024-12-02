import express from 'express';
import { loginController, registerController, verifyEmail } from '../controllers/authController.js';

const router = express.Router();

//Login
router.post('/login', loginController);
//Registration
router.post('/register', registerController);
//Email verifications
router.post('/verifyemail', verifyEmail);


export default router;
