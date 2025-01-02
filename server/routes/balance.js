const express = require("express");
const router = express.Router();
const {
  getuser,
  updatebalance,
  sendEmail,
  sendComplain,
} = require("../controllers/Account");
const { verifyAdmin } = require("../middleware/auth");

router.get("/getuser", verifyAdmin, getuser);
router.put("/updatebalance", verifyAdmin, updatebalance);
router.post("/sendemail", sendEmail);
router.post("/sendcomp", sendComplain);

module.exports = router;
