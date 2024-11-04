const express = require("express");
const router = express.Router();
const { getuser, updatebalance, sendEmail, sendComplain } = require("../controllers/Account");

router.get("/getuser", getuser);
router.put("/updatebalance", updatebalance);
router.post("/sendemail", sendEmail);
router.post("/sendcomp", sendComplain);


module.exports = router;
