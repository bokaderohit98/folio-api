// Loading configurations
if (process.env.NODE_ENV !== "production") {
  // eslint-disable-next-line global-require
  require("dotenv").config();
}

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
app.use(express.static(path.join(__dirname, "build")));

// Mounting Routes
app.use("/api/user", userRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/work", workRoutes);
app.use("/api/achivement", achivementRoutes);

// Setting up static directory
app.use("/images", express.static(path.join(__dirname, "public/images")));

// Serving react productin build
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

// Starting App
const { PORT } = process.env;
app.listen(PORT, err => {
  if (err) console.log(err);
  else console.log(`Server running on PORT ${PORT}`);
});
