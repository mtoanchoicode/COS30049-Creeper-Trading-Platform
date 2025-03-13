import { Router } from "express";
import { createHandleTransaction, getHandleTransaction } from "../controllers/user_transaction.controller";
const TransactionRouter = Router();

TransactionRouter.get("/", getHandleTransaction)

TransactionRouter.post("/created", createHandleTransaction); // call the sendEmail in the controller

export default TransactionRouter; //export default