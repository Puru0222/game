const express = require("express");
const router = express.Router();
const { login, signup, sendotp } = require("../controllers/Auth");

router.post("/login", login);
router.post("/signup", signup);
router.post("/sendotp", sendotp);

//      Reset Password

module.exports = router;
