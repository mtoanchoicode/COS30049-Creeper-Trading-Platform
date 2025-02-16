const express = require("express");
const walletRouter = require("./src/routes/wallet.route");
require("dotenv").config();
const cors = require("cors");
const { connectGraphDB } = require("./src/config/neo4jDatabase");
const chatRouter = require("./src/routes/chat.route");

const app = express();
const port = process.env.PORT || 3000;

connectGraphDB();

// Middleware to parse JSON request bodies
app.use(express.json());

//config cors
app.use(cors());

app.use("/v1/api/wallet", walletRouter);
app.use("/v1/api/chat", chatRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
