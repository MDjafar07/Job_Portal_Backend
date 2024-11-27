import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const database = await mongoose.connect(process.env.MONGO_URL_LOCAL);
        console.log("Database is Connected....");

    } catch (error) {
        console.log("Database is not Connected...", error);

    }
};

export default connectDB;