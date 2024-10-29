const express = require("express");
const router = express.Router();
const { create, getChallenges, updatePlayer } = require("../controllers/Game");

router.post("/create", create);
router.get("/getChallenges", getChallenges);
router.put("/updateplayer", updatePlayer);

module.exports = router;
