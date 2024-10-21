const User = require("../models/User");

exports.getuser = async (req, res) => {
  try {
    const { uid } = req.query;
    if (!uid) {
      return res.status(400).json({
        success: false,
        message: `Please Fill up All the Required Fields`,
      });
    }
    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: `User not found`,
      });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: `User not getting try later`,
    });
  }
};

exports.updatebalance = async (req, res) => {
  try {
    const { uid, balance } = req.body;
    if (!uid || !balance) {
      return res.status(403).send({
        success: false,
        message: "All fields are required",
      });
    }

    const updatedUserDetails = await User.findOneAndUpdate(
      { uid },
      { balance: balance },
      { new: true }
    );
    if (!updatedUserDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Balance updated successfully",
    });
  } catch (error) {
    console.error("Error occurred while updating balance:", error);
    return res.status(500).json({
      success: false,
      message:
        "An error occurred while updating the balance. Please try again.",
      error: error.message,
    });
  }
};
