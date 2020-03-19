// Loading configurations
require("dotenv").config();

// Loading dependencies
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");

const {
  userRoutes,
  educationRoutes,
  workRoutes,
  achivementRoutes
} = require("./routes");
const middlewares = require("./middlewares");

// Creating express app
const app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(middlewares.cors);
app.use(
  multer({ dest: path.join(__dirname, "public/images") }).single("avatar")
);

// Mounting Routes
app.use("/api/user", userRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/work", workRoutes);
app.use("/api/achivement", achivementRoutes);

// Setting up static directory
app.use("/images", express.static(path.join(__dirname, "public/images")));

// Starting App
const { PORT } = process.env;
app.listen(PORT, err => {
  if (err) console.log(err);
  else console.log(`Server running on PORT ${PORT}`);
});
