exports.verifyAdmin = async (req, res, next) => {
  try {
    const email = req.body.email || req.query.email || req.headers.email; // Check all possible locations

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required for authentication",
      });
    }

    if (email === "purusho1428@gmail.com") {
      return next();
    } else {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: Admin access only",
      });
    }
  } catch (error) {
    console.error("Error in verifyAdmin middleware:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred in the middleware",
    });
  }
};
