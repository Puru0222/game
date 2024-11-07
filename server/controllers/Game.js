const Challange = require("../models/Challange");
const User = require("../models/User");
const mongoose = require("mongoose");

exports.create = async (req, res) => {
  try {
    const {
      uid,
      roomId,
      roomPassword,
      teamMode,
      map,
      price,
      fullname,
      uniqueSerialNumber,
      gname,
      note,
    } = req.body;

    if (
      !uid ||
      !roomId ||
      !roomPassword ||
      !teamMode ||
      !map ||
      !price ||
      !fullname ||
      !uniqueSerialNumber ||
      !gname
    ) {
      return res.status(403).send({
        success: false,
        message: "All Fields are required",
      });
    }

    const challange = await Challange.create({
      uid,
      roomId,
      roomPassword,
      teamMode,
      map,
      price,
      fullname,
      uniqueSerialNumber,
      gname,
      note,
    });

    const user = await User.findOneAndUpdate(
      { uid },
      { $push: { createChallenge: challange._id } },
      { new: true }
    ).populate("createChallenge");
    console.log(user);

    return res.status(200).json({
      success: true,
      message: "Challange Created successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Challange cannot be Created. Please try again.",
    });
  }
};

exports.getChallenges = async (req, res) => {
  try {
    const challenges = await Challange.find()
      .populate({
        path: "users",
        select: "fullname",
      })
      .populate({
        path: "winners",
        select: "fullname",
      });

    res.status(200).json({ success: true, challenges });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.updatePlayer = async (req, res) => {
  try {
    const { id, uniqueSerialNumber, uid, newBalance, price } = req.body;
    const challenge = await Challange.findOne({ uniqueSerialNumber });

    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: "Challenge not found",
      });
    }
    if (newBalance < 0) {
      return res.status(500).json({
        sucess: false,
        message: "Insufficent Money",
      });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    console.log(user);
    for (let i = 0; i < user.joinChallenge.length; i++) {
      if (user.joinChallenge[i].equals(challenge._id)) {
        return res.status(200).json({
          success: true,
          message: "Already registered",
        });
      }
    }

    challenge.players += 1;
    challenge.balance += price;
    challenge.users.push(new mongoose.Types.ObjectId(id));
    await challenge.save();

    const updatedUserDetails = await User.findOneAndUpdate(
      { uid },
      { balance: newBalance },
      { new: true }
    ).populate("joinChallenge");
    updatedUserDetails.joinChallenge.push(
      new mongoose.Types.ObjectId(challenge._id)
    );
    await updatedUserDetails.save();
    //console.log(updatedUserDetails);

    return res.status(200).json({
      success: true,
      message: "Challenge updated successfully",
      //data: updatedPlayerDetail, // Optionally return the updated challenge
    });
  } catch (error) {
    console.error("Error occurred while updating Challenge:", error);
    return res.status(500).json({
      success: false,
      message:
        "An error occurred while updating the Challenge. Please try again.",
      error: error.message,
    });
  }
};

exports.updateChallenge = async (req, res) => {
  try {
    const { balance, users, challengeId, id: creatorId } = req.body;
    if (!balance || users.length === 0 || !challengeId) {
      return res.status(400).json({
        success: false,
        message: "Missing required data: balance, users, or challengeId.",
      });
    }
    const challenge = await Challange.findById(challengeId);
    if (!challenge) {
      return res
        .status(404)
        .json({ success: false, message: "Challenge not found." });
    }
    if (challenge.status === "completed") {
      return res
        .status(400)
        .json({ success: false, message: "Challenge is already completed." });
    }
    const adminId = "672af280520a7731da410e9c";
    const winnerShare = balance * 0.8;
    const creatorShare = balance * 0.15;
    const adminShare = balance * 0.05;
    const rewardPerUser = winnerShare / users.length;

    const updateUserBalances = users.map(async (userId) => {
      return await User.findByIdAndUpdate(
        userId,
        { $inc: { balance: rewardPerUser } },
        { new: true }
      );
    });
    await Promise.all(updateUserBalances);
    await User.findByIdAndUpdate(
      creatorId,
      { $inc: { balance: creatorShare } },
      { new: true }
    );
    await User.findByIdAndUpdate(
      adminId,
      { $inc: { balance: adminShare } },
      { new: true }
    );
    challenge.status = "completed";
    challenge.winners = users;
    await challenge.save();
    return res.status(200).json({
      success: true,
      message: "Challenge updated successfully",
      rewardPerUser,
      updatedChallenge: challenge,
    });
  } catch (error) {
    console.error("Error updating challenge:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

exports.markChallengeStarted = async (req, res) => {
  const { challengeId } = req.body;

  try {
    const challenge = await Challange.findByIdAndUpdate(
      challengeId,
      { status: "started" },
      { new: true }
    );

    if (!challenge) {
      return res
        .status(404)
        .json({ success: false, message: "Challenge not found." });
    }

    res.status(200).json({
      success: true,
      message: "Challenge marked as started.",
      challenge,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to update challenge status." });
  }
};
