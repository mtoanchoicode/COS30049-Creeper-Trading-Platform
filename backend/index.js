const express = require("express");
const walletRouter = require("./src/routes/wallet.route");
require("dotenv").config();
const cors = require("cors");
const { connectGraphDB } = require("./src/config/neo4jDatabase");
const connectionMongoDB = require("./src/config/mongoDatabase");
const chatRouter = require("./src/routes/chat.route");
const profileRouter = require("./src/routes/profile.route");

const app = express();
const port = process.env.PORT || 3000;

connectGraphDB();

// Middleware to parse JSON request bodies
app.use(express.json());

//config cors
app.use(cors());

app.use("/v1/api/wallet", walletRouter);
app.use("/v1/api/chat", chatRouter);
app.use("/v1/api/profile", profileRouter);

// app.listen(port, () => {
//   console.log(`App listening on port ${port}`);
// });

(async () => {
  try {
    //using mongoose
    await connectionMongoDB();

    app.listen(port, () => {
      console.log(`Backend Nodejs App listening on port ${port}`);
    });
  } catch (error) {
    console.log(">>> Error connect to DB: ", error);
  }
})();
