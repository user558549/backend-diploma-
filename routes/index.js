const express = require("express");
const cors = require("cors");

const router = express.Router({ mergeParams: true });
router.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
router.use("/", require("./auth"));
router.use("/rooms", require("./room"));
router.use("/users", require("./user"));

module.exports = router;
