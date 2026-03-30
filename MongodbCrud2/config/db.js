import mongoose from "mongoose";


const connectDB = async () => {
    const uri = process.env.MONGO_URI;
    if (!uri) {
        throw new Error('MONGO_URI is not set. Add it to your .env file or environment variables.');
    }

    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("connection failed", error);
        throw error;
    }
}

export default connectDB;