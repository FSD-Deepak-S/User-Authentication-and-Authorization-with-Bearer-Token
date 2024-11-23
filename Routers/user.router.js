import express from "express";
import { getUser, login, registerUser } from "../Controllers/user.controller.js";
import authMiddleWare from "../Middleware/auth.middleware.js";

const router = express.Router();

router.post('/registerUser',registerUser);
router.post('/login',login);



router.get("/getuser", authMiddleWare ,getUser)

export default router;