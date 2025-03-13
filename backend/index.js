const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const { connectGraphDB } = require("./src/config/neo4jDatabase");
const walletRouter = require("./src/routes/wallet.route").default;
const connectionMongoDB = require("./src/config/mongoDatabase");
const chatRouter = require("./src/routes/chat.route").default;
const profileRouter = require("./src/routes/profile.route").default;
const mailRouter = require("./src/routes/mail.route").default;
const newsRouter = require("./src/routes/news.route").default;
const transactionRouter = require("./src/routes/transaction.route.js").default;
const userRouter = require("./src/routes/transaction.route.js").default;

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
app.use("/v1/api/profile", profileRouter);
app.use("/v1/api/mail", mailRouter);
app.use("/v1/api/news", newsRouter);
app.use("/v1/api/transaction", transactionRouter);
app.use("/v1/api/user", userRouter);


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
