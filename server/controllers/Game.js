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
