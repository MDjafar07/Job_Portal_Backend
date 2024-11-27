
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import testRoutes from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import paginationRoutes from "./routes/paginationRoutes.js";
import errorMiddleware from "./middelwares/errorMiddelware.js";
import userRoutes from "./routes/userRoutes.js";
import jobsRoutes from "./routes/jobsRoutes.js";
const app = express();
const PORT = process.env.PORT || 6000;

connectDB();

//Middleware
app.use(express.json());
app.use(cors());
app.use('/api/test', testRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/pagination', paginationRoutes);
app.use('/api/update', userRoutes);
app.use('/api/jobs', jobsRoutes);
app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server is Runing ${PORT}....`);
});