require("dotenv").config();
const express = require("express");

const app = express();

const { PORT } = process.env;
app.listen(PORT, err => {
  if (err) console.log(err);
  else console.log(`Server running on PORT ${PORT}`);
});
