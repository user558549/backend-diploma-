const express = require("express");
const cors = require("cors");

const router = express.Router({ mergeParams: true });
router.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
router.use("/", require("./auth"));
router.use("/rooms", require("./room"));

module.exports = router;
