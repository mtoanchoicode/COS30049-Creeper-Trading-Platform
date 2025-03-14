import { Router } from "express";
import { postAnwserChat } from "../controllers/chat.controller";
const chatRouter = Router();

chatRouter.get("/hello", (req, res) => {
  return res.status(200).json("Hello CHATGPT API");
});

chatRouter.post("/", postAnwserChat);

export default chatRouter; //export default
