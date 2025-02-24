const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  uid: String,
  name: String,
  email: String,
  password: String,
  watch_list: [String],
});

const User = mongoose.model("user", userSchema);

module.exports = User;
