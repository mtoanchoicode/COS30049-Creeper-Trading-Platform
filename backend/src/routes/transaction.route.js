const express = require("express");
const { createHandleTransaction, getHandleTransaction, getHandleAllTransaction } = require("../controllers/user_transaction.controller");
const TransactionRouter = express.Router();

TransactionRouter.get("/", getHandleTransaction)

TransactionRouter.get("/created", (req, res) => {
    return res.status(200).json("Success Get Created Transaction");
});


TransactionRouter.post("/created", createHandleTransaction); 

TransactionRouter.get("/allTransaction", getHandleAllTransaction)

module.exports = TransactionRouter; //export default