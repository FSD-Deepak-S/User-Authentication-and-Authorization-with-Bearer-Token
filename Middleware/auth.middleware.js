import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Users from "../Models/user.model.js";

dotenv.config()


const authMiddleWare =async (req,res,next)=>{

    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
        return res.status(401).json({ message: "Token Missing" });
    }


    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRETKEY);
        req.user = decoded;
        // const user = await Users.findById(req.user._id)
        next();
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}


export default authMiddleWare;