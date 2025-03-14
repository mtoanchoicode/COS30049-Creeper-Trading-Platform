const express = require("express");
const { createHandleTransaction, getHandleTransaction } = require("../controllers/user_transaction.controller");
const TransactionRouter = express.Router();

TransactionRouter.get("/", getHandleTransaction)
TransactionRouter.post("/created", createHandleTransaction); 

module.exports = TransactionRouter; //export default