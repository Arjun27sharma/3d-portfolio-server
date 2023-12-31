// auth middleware
const User = require("../Models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res, next) => {
  const token = req.cookies.token;
  console.log("Token:", token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    } else {
      const user = await User.findById(data.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      req.user = user; // Set the user object in the request for use in other routes/controllers
      next();
    }
  });
};
