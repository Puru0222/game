const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    uid: {
      type: Number,
      required: true,
      unique: true,
    },
    comment: {
      type: String,
      required: true,
      maxLength: 200,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
