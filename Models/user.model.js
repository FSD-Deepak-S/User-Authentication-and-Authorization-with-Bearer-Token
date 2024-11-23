import { mongoose } from "mongoose";

const userSchema =new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    role:String,
    token:String
})

const Users = mongoose.model("users",userSchema);

export default Users;