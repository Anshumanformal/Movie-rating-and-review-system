const mongoose = require("mongoose");
const db = "mongodb://localhost:27017/mymoviedb";

const connect = mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(console.log("Connection Successful"))
  .catch((err) => {
    console.log(`Error is : `, err);
  });

module.exports = { connect, db };
