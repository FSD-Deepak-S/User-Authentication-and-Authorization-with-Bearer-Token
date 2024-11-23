import Users from "../Models/user.model.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();

export const registerUser = async (req,res) => {
    try {
        const {username,email,password,role} = req.body;
        const hashPassword = await bcrypt.hash(password,10);
        const newUser = new Users({username,email,password:hashPassword,role})
        await newUser.save();
        res.status(200).json({
            message:"User Registered Successfully",
            data:newUser
        })
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const login = async (req,res) => {
    try {
        const {email,password} = req.body;
        const user = await Users.findOne({email})
        if (!user) {
            return res.status(403).json({
                message:"User not found"
            })
        }
        const passwordMatch = await bcrypt.compare(password,user.password);
        if (!passwordMatch) {
            return res.status(403).json({
                message:"Invalid Password"
            })
        } 

        const token = jwt.sign({_id:user.id},process.env.JWT_SECRETKEY)
        user.token = token;
        await user.save();
        return res.status(200).json({
            message:"User Logged in",
            token:token,
            // user:user
        })
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}


export const getUser = async (req, res) => {
    try {
      //const userId = req.user._id;
      const user = await Users.find();
      res.status(200).json({ message: "Authorized User", data: user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };