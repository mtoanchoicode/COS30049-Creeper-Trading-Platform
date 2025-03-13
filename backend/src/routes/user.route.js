import express from "express";
import { registerUser } from "../controllers/user_address.controller.js";
const userRouter = express.Router();

// add wallet address
userRouter.post("/register", registerUser);

export default userRouter;
