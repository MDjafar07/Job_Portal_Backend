import express from "express";
import { updateUserController } from "../controllers/userController.js";
import userAuth from "../middelwares/authMiddelware.js";


const router = express.Router();

router.put('/updateUser', userAuth, updateUserController);


export default router;