const mongoose = require("mongoose");
const roles = require("../constants/roles");
const validator = require("validator");

const roomSchema = mongoose.Schema({
  number_room: { type: String, required: true },
  reservation: { type: Boolean, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  user_reservation: {
    userLogin: { type: String },
  },
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
