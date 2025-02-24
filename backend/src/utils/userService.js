require("dotenv").config();
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { generateRandomString } = require("./generateRandom");
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
      uid: generateRandomString(10),
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

const loginService = async (email, password) => {
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      const isMatchPassword = await bcrypt.compare(password, user.password);
      if (!isMatchPassword) {
        return {
          EC: 2,
          EM: "Email/Password invalid",
        };
      } else {
        const payload = {
          uid: user.uid,
          email: user.email,
          name: user.name,
        };
        const access_token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRE,
        });
        return {
          EC: 0,
          access_token,
          user: { uid: user.uid, email: user.email, name: user.name },
        };
      }
    } else {
      return {
        EC: 1,
        EM: "Email/Password invalid",
      };
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getUserService = async () => {
  try {
    let result = await User.find({}).select("-password");
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  createUserService,
  loginService,
  getUserService,
};
