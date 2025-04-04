const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const { connectGraphDB } = require("./src/config/neo4jDatabase");
const walletRouter = require("./src/routes/wallet.route");
const connectionMongoDB = require("./src/config/mongoDatabase");
//const connectionPostgreSQL = require("./src/config/CreaperDB");
const chatRouter = require("./src/routes/chat.route");
const profileRouter = require("./src/routes/profile.route");
const mailRouter = require("./src/routes/mail.route");
const newsRouter = require("./src/routes/news.route");
const transactionRouter = require("./src/routes/transaction.route");
const userRouter = require("./src/routes/user.route");
const collectionNFT = require("./src/routes/collectionNFT.route");
//Routers for NFTs
const collectionRouter = require("./src/routes/collection.route");
const NFTRouter = require("./src/routes/nft.route");
const NFTTransactionRouter = require("./src/routes/nft_transaction.route");
const nftSearchRouter = require("./src/routes/nftSearch.route");
const collectionDetailsRouter = require("./src/routes/collection_details.route");

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
app.use("/v1/api/nft/create", collectionNFT);

app.use("/v1/api/collection", collectionRouter);
app.use("/v1/api/nft", NFTRouter);
app.use("/v1/api/nft_transaction", NFTTransactionRouter);
app.use("/v1/api/nft-search", nftSearchRouter);
app.use("/v1/api/collectionDetails", collectionDetailsRouter);

// app.listen(port, () => {
//   console.log(`App listening on port ${port}`);
// });

(async () => {
  try {
    //using mongoose
    await connectionMongoDB();

    //using PostgreSQL database
    // await this connected

    // await connectionPostgreSQL();

    app.listen(port, () => {
      console.log(`Backend Nodejs App listening on port ${port}`);
    });
  } catch (error) {
    console.log(">>> Error connect to DB: ", error);
  }
})();
