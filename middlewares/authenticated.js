const User = require("../models/User");
const { verify } = require("../helpers/token");

module.exports = async function authenticated(req, res, next) {
  if (!req.cookies || !req.cookies.token) {
    return res.status(401).send({ error: "No token provided", user: null });
  }
  try {
    const tokenData = verify(req.cookies.token);
    const user = await User.findOne({ _id: tokenData.id });
    if (!user) {
      res
        .status(401)
        .send({ error: "Authenticated user not found", user: null });

      return;
    }
    req.user = user;

    next();
  } catch (err) {
    res.status(401).send({ error: "Invalid or expired token", user: null });
    return;
  }
};
