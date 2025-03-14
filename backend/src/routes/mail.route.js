import { Router } from "express";
import { sendEmail } from "../controllers/mail.controller";
const mailRouter = Router();

mailRouter.get("/", (req, res) => {
    return res.status(200).json("Success Get");
});


mailRouter.get("/subscribe", (req, res) => {
    return res.status(200).json("Success Get Subscribe");
});


mailRouter.post("/subscribe", sendEmail); // call the sendEmail in the controller

export default mailRouter; //export default