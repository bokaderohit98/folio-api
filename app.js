require("dotenv").config();
require("./config/mongoose");

const express = require("express");
const bodyParser = require("body-parser");

const { User, Education } = require("./models");
const { userRoutes, educationRoutes } = require("./routes");

const dev = require("./dev/populateDB");

const app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Mounting Routes
app.use("/api/user", userRoutes);
app.use("/api/education", educationRoutes);

app.get("/", (req, res) => {
  User.find({})
    .then(users => {
      console.log(users);
      res.send(users);
    })
    .catch(err => {
      res.send(err);
    });
});

app.get("/work", (req, res) => {
  Education.find({}).then(works => {
    res.send(works);
  });
});

app.get("/add", (req, res) => {
  dev.saveUser();
  res.send();
});

app.get("/delete", (req, res) => {
  dev.deleteUser();
  res.send();
});

// Starting App
const { PORT } = process.env;
app.listen(PORT, err => {
  if (err) console.log(err);
  else console.log(`Server running on PORT ${PORT}`);
});
