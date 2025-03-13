import { Router } from "express";

import { createUser, handleLogin, getUser, getAccount, forgotPassword, otpPassword, resetPassword, getWatchList, setWatchList } from "../controllers/user.controller";
import auth from "../middlewares/auth";

const profileRouter = Router();

profileRouter.all("*", auth);

profileRouter.get("/", (req, res) => {
  return res.status(200).json("Hello User");
});

profileRouter.post("/register", createUser);

profileRouter.post("/login", handleLogin);

profileRouter.get("/account", getAccount);

profileRouter.post("/forgot", forgotPassword);

profileRouter.post("/forgot/otp", otpPassword);

profileRouter.post("/forgot/reset", resetPassword);

profileRouter.get("/watch-list", getWatchList);

profileRouter.post("/watch-list", setWatchList);

export default profileRouter; //export default
