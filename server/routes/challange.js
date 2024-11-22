const express = require("express");
const router = express.Router();
const {
  create,
  getChallenges,
  updatePlayer,
  updateChallenge,
  markChallengeStarted,
  deleteChallenge,
} = require("../controllers/Game");

router.post("/create", create);
router.get("/getChallenges", getChallenges);
router.put("/updateplayer", updatePlayer);
router.put("/updatechallenge", updateChallenge);
router.put("/markChallengeStarted", markChallengeStarted);
router.delete("/deleteChallenge", deleteChallenge);

module.exports = router;
