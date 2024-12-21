const bcrypt = require("bcryptjs");
const User = require("../models/User");
const OTP = require("../models/OTP");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/passwordUpdate");

require("dotenv").config();

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: `Please Fill up All the Required Fields`,
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: `User is not Registered with Us Please SignUp to Continue`,
      });
    }
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { email: user.email, id: user._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );
      user.token = token;
      user.password = undefined;
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: `User Login Success`,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: `Password is incorrect`,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: `Login Failure Please Try Again`,
    });
  }
};

exports.signup = async (req, res) => {
  try {
    const { fullname, uid, email, password, confirmPassword, otp } = req.body;

    if (!fullname || !uid || !email || !password || !confirmPassword || !otp) {
      return res.status(403).send({
        success: false,
        message: "All Fields are required",
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Password and Confirm Password do not match. Please try again.",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({
        success: true,
        message: "User already exists. Please Login to continue.",
      });
    }
    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    console.log(response);
    if (response.length === 0) {
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    } else if (otp !== response[0].otp) {
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullname,
      uid,
      email,
      password: hashedPassword,
    });
    return res.status(200).json({
      success: true,
      user,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again.",
    });
  }
};

exports.sendotp = async (req, res) => {
  try {
    const { email, uid } = req.body;
    const checkUserPresent = await User.findOne({ uid });

    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: `Uid is Already Registered`,
      });
    }
    const checkEmailPresent = await User.findOne({ email });

    if (checkEmailPresent) {
      return res.status(401).json({
        success: false,
        message: `Email is Already Registered`,
      });
    }
    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    const result = await OTP.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
    }
    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);
    console.log("OTP Body", otpBody);
    res.status(200).json({
      success: true,
      message: `OTP Sent Successfully`,
      otp,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.sendpasswordotp = async (req, res) => {
  try {
    const { email } = req.body;
    const checkUserPresent = await User.findOne({ email });

    if (!checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: `User is Not Registered`,
      });
    }
    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    const result = await OTP.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
    }
    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);
    console.log("OTP Body", otpBody);
    res.status(200).json({
      success: true,
      message: `OTP Sent Successfully`,
      otp,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};

async function sendUpdationEmail(email) {
  try {
    const mailResponse = await mailSender(
      email,
      "Updation Email",
      emailTemplate(email)
    );
    console.log("Email sent successfully: ", mailResponse.response);
  } catch (error) {
    console.log("Error occurred while sending email: ", error);
    throw error;
  }
}
exports.updatepassword = async (req, res) => {
  try {
    const { email, otp, password } = req.body;
    if (!email || !otp || !password) {
      return res.status(403).send({
        success: false,
        message: "All fields are required",
      });
    }
    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    if (response.length === 0) {
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    } else if (otp !== response[0].otp) {
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUserDetails = await User.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );
    if (!updatedUserDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    // await sendUpdationEmail(email);
    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Error occurred while updating password:", error);
    return res.status(500).json({
      success: false,
      message:
        "An error occurred while updating the password. Please try again.",
      error: error.message,
    });
  }
};

exports.fetchUser = async (req, res) => {
  try {
    // Extract token from authorization header
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing. Authorization denied.",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    // console.log(userId)
    const user = await User.findById(userId).select("-password -token");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error in fetching user:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user. Please try again later.",
    });
  }
};

// backend/controllers/paymentController.js
exports.initiatePayment = async (req, res) => {
  const { amount, uid } = req.body;

  try {
    // Replace with your UPIGateway API credentials
    const apiKey = "4de07135-eaea-4ca7-954e-144c74a588fa";

    // Request to generate a dynamic QR code
    const response = await axios.post(
      "https://api.upigateway.com/generate-qrcode",
      {
        amount,
        note: `Payment for UID: ${uid}`,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data && response.data.qrCodeURL) {
      return res.status(200).json({
        qrCodeURL: response.data.qrCodeURL,
      });
    }

    return res.status(400).json({
      message: "Failed to generate QR code",
    });
  } catch (error) {
    console.error("Error initiating payment:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
