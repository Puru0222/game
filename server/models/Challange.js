const mongoose = require("mongoose");

const ChallangeSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
  },
  roomId: {
    type: String,
    required: true,
  },
  roomPassword: {
    type: String,
    required: true,
  },
  teamMode: {
    type: String,
    required: true,
  },
  map: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  players: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  uniqueSerialNumber: {
    type: String,
    required: true,
  },
  gname: {
    type: String,
    require: true,
  },
  note: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 4 * 60 * 60,
  },
});

const Challange = mongoose.model("Challange", ChallangeSchema);
module.exports = Challange;
