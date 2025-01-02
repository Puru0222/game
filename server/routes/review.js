const express = require("express");
const router = express.Router();
const {
  getAllReviews,
  createOrUpdateReview,
} = require("../controllers/Review");

router.post("/create-review", createOrUpdateReview);
router.get("/get-reviews", getAllReviews);

module.exports = router;
