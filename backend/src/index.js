const express = require("express");
const walletRouter = require("./routes/wallet.route");
require("dotenv").config();
const cors = require("cors");

const app = express();
const port = 3000;

//config cors
app.use(cors());

app.use("/v1/api/wallet", walletRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
