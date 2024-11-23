import express  from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./Database/dbConfig.js";
import userRouter from "./Routers/user.router.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

connectDb();

const port = process.env.PORT || 5000

app.get('/',(req,res)=>{
    res.status(200).send("Welcome to Deepak Backend Module")
})

app.use("/api/users/",userRouter)

app.listen(port,()=>{
    console.log("Server Connected Successfully");
    
})