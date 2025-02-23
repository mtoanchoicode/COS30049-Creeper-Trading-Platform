require("dotenv").config();

const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  const white_lists = ["/", "/login", "/register"];

  if (white_lists.find((item) => "/v1/api" + item === req.originalUrl)) {
    next();
  } else {
    if (req?.headers?.authorization?.split(" ")?.[1]) {
      const token = req.headers.authorization.split(" ")[1];
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { email: decoded.email, name: decoded.name };
        console.log(decoded);
        next();
      } catch (error) {
        return res.status(401).json({
          message: "Access Token wrong/ or Token is expired",
        });
      }
    } else {
      return res.status(401).json({
        message: "You don't have Access Token/ or Token is expired",
      });
    }
  }
};

module.exports = auth;
