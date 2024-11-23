import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDb = async (req,res) => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("DB Connected Successfully");
        
    } catch (error) {
        console.log(error);
        
    }
}

export default connectDb;