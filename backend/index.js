const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require('body-parser')
const { connectGraphDB } = require("./src/config/neo4jDatabase");
const walletRouter = require("./src/routes/wallet.route");
const chatRouter = require("./src/routes/chat.route");
const mailRouter = require("./src/routes/mail.route");

const app = express();
const port = process.env.PORT || 3000;

connectGraphDB();

// Middleware to parse JSON request bodies
app.use(express.json());

app.use(bodyParser.json());

//config cors
app.use(cors());

app.use("/v1/api/wallet", walletRouter);
app.use("/v1/api/chat", chatRouter);
app.use("/v1/api/mail", mailRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
