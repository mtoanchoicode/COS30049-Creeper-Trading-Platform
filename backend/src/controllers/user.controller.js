const ForgotPassword = require("../models/forgotPassword.model");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const {
  createUserService,
  loginService,
  getUserService,
} = require("../utils/userService");

const sendMailHelper = require("../utils/sendEmail");
const { generateRandomString } = require("../utils/generateRandom");

const createUser = async (req, res) => {
  const { name, email, password, watchList } = req.body;
  const data = await createUserService(name, email, password, watchList);
  return res.status(200).json(data);
};

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  const data = await loginService(email, password);
  return res.status(200).json(data);
};

const getUser = async (req, res) => {
  const data = await getUserService();
  return res.status(200).json(data);
};

const getAccount = async (req, res) => {
  return res.status(200).json(req.user);
};

const forgotPassword = async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({
    email: email,
  });

  if (!user) {
    return res.status(404).json(`Email is not existed`);
  }

  const otp = generateRandomString(4);

  const objectForgotPassword = {
    email: email,
    otp: otp,
    expiredAt: Date.now(),
  };

  console.log(objectForgotPassword);

  const forgotPassword = new ForgotPassword(objectForgotPassword);
  await forgotPassword.save();

  const subject =
    "[Creeper Trading] - OTP verification code to retrieve password";
  const html = `
    <p>OTP code is <b>${otp}</b>.</p><p>Note: Do not reveal the OTP code.</p><p>It will expire after 3 minutes.</p>
    `;
  sendMailHelper.sendMail(email, subject, html);

  return res.status(200).json({
    message: "OTP has been sent to your email.",
    email: email,
  });
};

const otpPassword = async (req, res) => {
  const email = req.body.email;
  const otp = req.body.otp;

  const result = await ForgotPassword.findOne({
    email: email,
    otp: otp,
  });

  if (!result) {
    return res.status(404).json(`Wrong OTP`);
  }

  const user = await User.findOne({
    email: email,
  });

  const payload = {
    uid: user.uid,
    email: user.email,
    name: user.name,
  };
  const access_token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  return res.status(200).json({ access_token });
};

// [POST]
const resetPassword = async (req, res) => {
  saltRounds = 10;
  const password = req.body.password;
  const hashPassword = await bcrypt.hash(password, saltRounds);
  const email = req.user.email;

  await User.updateOne(
    {
      email: email,
    },
    {
      password: hashPassword,
    }
  );

  return res.status(200).json("Update Complete");
};

module.exports = {
  createUser,
  handleLogin,
  getUser,
  getAccount,
  forgotPassword,
  otpPassword,
  resetPassword,
};
