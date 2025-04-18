require("dotenv").config();
const mongoose = require("mongoose");

const dbState = [
  {
    value: 0,
    label: "Disconnected",
  },
  {
    value: 1,
    label: "Connected",
  },
  {
    value: 2,
    label: "Connecting",
  },
  {
    value: 3,
    label: "Disconnecting",
  },
];

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    const state = Number(mongoose.connection.readyState);
    console.log(
      dbState.find((f) => f.value === state).label,
      "to MongoDB database"
    ); // connected to db
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }

};
module.exports = connection;
