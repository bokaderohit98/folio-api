// Loading configurations
require("dotenv").config();

// Loading dependencies
const express = require("express");
const bodyParser = require("body-parser");

const { User } = require("./models");
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

// Mounting Routes
app.use("/api/user", userRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/work", workRoutes);
app.use("/api/achivement", achivementRoutes);

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

app.delete("/del", async (req, res) => {
  try {
    await User.findOneAndDelete(
      { email: "bokaderohit98@gmail.com" },
      { userFindAndModify: false }
    );
    res.send({ success: "Deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Error" });
  }
});

// Starting App
const { PORT } = process.env;
app.listen(PORT, err => {
  if (err) console.log(err);
  else console.log(`Server running on PORT ${PORT}`);
});
