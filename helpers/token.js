const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  generate(data) {
    return jwt.sign(data, process.env.SIGN, { expiresIn: "30d" });
  },
  verify(token) {
    return jwt.verify(token, process.env.SIGN);
  },
};
