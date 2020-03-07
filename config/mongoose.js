const mongoose = require("mongoose");

mongoose
  .createConnection("mongodb://localhost:27017/folio", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(conn => {
    global.connection = conn;
    console.log("Connected to Database");
  })
  .catch(err => console.log(err));

module.exports = global.connection;
