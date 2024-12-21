const express = require("express");
const router = express.Router();
const {
  login,
  signup,
  sendotp,
  sendpasswordotp,
  updatepassword,
  fetchUser,
  initiatePayment,
} = require("../controllers/Auth");

router.post("/login", login);
router.post("/signup", signup);
router.post("/sendotp", sendotp);
router.post("/sendpasswordotp", sendpasswordotp);
router.put("/updatepassword", updatepassword);
router.get("/fetchuser", fetchUser);


module.exports = router;
