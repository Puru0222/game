const express = require("express");
const router = express.Router();
const { getuser, updatebalance } = require("../controllers/Account");

router.get("/getuser", getuser);
router.put("/updatebalance", updatebalance);

module.exports = router;
