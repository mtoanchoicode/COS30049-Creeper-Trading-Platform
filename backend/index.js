const express = require("express");
const walletRouter = require("./src/routes/wallet.route");
require("dotenv").config();
const cors = require("cors");
const { connectGraphDB } = require("./src/config/neo4jDatabase");

const app = express();
const port = process.env.PORT || 3000;

connectGraphDB();

//config cors
app.use(cors());

app.use("/v1/api/wallet", walletRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
