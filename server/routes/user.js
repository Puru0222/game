const express = require("express");
const router = express.Router();
const { login, signup, sendotp, sendpasswordotp } = require("../controllers/Auth");

router.post("/login", login);
router.post("/signup", signup);
router.post("/sendotp", sendotp);
router.post("/sendpasswordotp", sendpasswordotp);

//      Reset Password

module.exports = router;
