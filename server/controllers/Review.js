const Review = require("../models/Review");

exports.createOrUpdateReview = async (req, res) => {
  try {
    const { fullname, uid, comment } = req.body;
    const existingReview = await Review.findOne({ uid });

    if (existingReview) {
      existingReview.fullname = fullname;
      existingReview.comment = comment;
      await existingReview.save();
      
      return res.status(200).json({
        success: true,
        message: "Review updated successfully",
        review: existingReview,
      });
    }

    const review = await Review.create({
      fullname,
      uid,
      comment,
    });

    res.status(201).json({
      success: true,
      message: "Review created successfully",
      review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create/update review",
      error: error.message,
    });
  }
};

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
      error: error.message,
    });
  }
};