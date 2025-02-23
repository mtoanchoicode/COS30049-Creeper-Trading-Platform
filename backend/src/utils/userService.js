require("dotenv").config();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const createUserService = async (name, email, password, watchList) => {
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      console.log("Choose other email");
      return null;
    }
    const hashPassword = await bcrypt.hash(password, saltRounds);
    let result = await User.create({
      name: name,
      email: email,
      password: hashPassword,
      watch_list: watchList || [],
    });
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  createUserService,
};
