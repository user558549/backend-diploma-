const express = require("express");
const cors = require("cors");

const router = express.Router({ mergeParams: true });
router.use(
  cors({
    origin: "http://94.102.89.76",
    credentials: true,
  }),
);
router.use("/api", require("./auth"));
router.use("/api/rooms", require("./room"));

module.exports = router;
