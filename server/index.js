const express = require("express");
const app = express();
const userRoutes = require("./routes/user");
const balanceRoutes = require("./routes/balance");
const challangeRoutes = require("./routes/challange");
const reviewRoutes = require("./routes/review");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
require("./controllers/Challenge");

const PORT = process.env.PORT || 4000;
dotenv.config();
database.connect();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    //origin: "http://localhost:3000",
    origin: "*",
    credentials: true,
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

cloudinaryConnect();

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/update", balanceRoutes);
app.use("/api/v1/challange", challangeRoutes);
app.use("/api/v1/review", reviewRoutes);

// Deafult Route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running ...",
  });
});

app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
});
