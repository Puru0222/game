const Challange = require("../models/Challange");

exports.create = async (req, res) => {
  try {
    const {
      uid,
      roomId,
      roomPassword,
      teamMode,
      map,
      price,
      players,
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
      !players ||
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
      players,
      fullname,
      uniqueSerialNumber,
      gname,
      note,
    });
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
    const challenges = await Challange.find();

    res.status(200).json({ success: true, challenges });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.updatePlayer = async (req, res) => {
  try {
    const { uniqueSerialNumber } = req.body;
    const challenge = await Challange.findOne({ uniqueSerialNumber });

    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: "Challenge not found",
      });
    }

    challenge.players += 1;
    const updatedPlayerDetail = await challenge.save();

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
