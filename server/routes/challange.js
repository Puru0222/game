const express = require("express");
const router = express.Router();
const {
  create,
  getChallenges,
  updatePlayer,
  updateChallenge,
  markChallengeStarted,
} = require("../controllers/Game");

router.post("/create", create);
router.get("/getChallenges", getChallenges);
router.put("/updateplayer", updatePlayer);
router.put("/updatechallenge", updateChallenge);
router.put("/markChallengeStarted", markChallengeStarted);

module.exports = router;
