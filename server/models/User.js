const mongoose = require ("mongoose");
const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      trim: true,
    },
    uid: {
      type: Number,
      trim: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
    password: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    joinChallenge: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Challange",
      },
    ],
    createChallenge: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Challange",
      },
    ],
    token: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
