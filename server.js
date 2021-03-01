const express = require("express");
const mongoose = require("mongoose");
const connection = require("./connection/connect");
const auth = require("./middleware/auth");
const routes = require("./routes");

//Importing Customer route.
const customerRoute = require("./routes/customer");

//Requiring models.
const Customer = require("./models/Customer");
const Movies = require("./models/Movies");
// const Ratings = require("./models/Ratings");
const Comments = require("./models/ratingComments");

//Requiring bcryptjs for password encryption.
const bcrypt = require("bcryptjs");

//Requiring JWT for token generation.
// const jwt = require("jsonwebtoken");

// const {sendWelcomeEmail} = require('./services/email')

//Requiring JOI for validation.
// const joi = require("joi");

const app = express();

//Port for listening.
const PORT = 3000;

//Middleware.
app.use(express.json());

//Basic route.
app.get("/", (req, res) => {
  res.send(`Basic Route`);
});

app.use("/api", routes);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});
