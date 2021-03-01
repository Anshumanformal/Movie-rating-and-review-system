const joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Customer = require("../models/Customer");
// const Movies = require("../models/Movies");
const ratingComment = require("../models/ratingComments");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.register = async (req, res) => {
  try {
    const customerData = req.body;
    const { name, email, password, contact } = customerData;
    const { error } = joi
      .object({
        name: joi.string().min(3).required(),
        email: joi
          .string()
          .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
          .required(),
        password: joi.string().min(6).required(),
        contact: joi.string().min(10).required(),
        movieName: joi.string(),
      })
      .validate(req.body);
    if (error) throw Error(error);

    //   Hash password.
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    //   1
    const customer = await new Customer(req.body).save();
    //   or ->  2
    // await Customer.create(req.body);

    //   JWT authentication.
    // const token = jwt.sign(
    //   { id: customer._id },
    //   "secretkey",
    //   async (err, token) => {
    //     return token;
    //     // Another way of doing the same.
    //     // await Customer.create(req.body);
    //     // let savedCustomer = await new customer(req.body).save();
    //     //Email send implementation.
    //     // sendWelcomeEmail(customer.email);
    //     // console.log(res);

    //     // let newcust = await savedCustomer;
    //   }
    // );
    const token = jwt.sign({ _id: customer._id }, "secretkey", {
      // expiresIn: "1h",
    });
    res.json({
      customer,
      token,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.signIn = async (req, res) => {
  // //jwt verify.
  // jwt.verify(req.token, "secretkey", (err, authData) => {
  //   if (err) {
  //     res.sendStatus(403);
  //   } else {
  //     res.json({
  //       message: "User authenticated",
  //       authData,
  //     });
  //   }
  // });

  res.send(`User signed in`);
};

exports.getProfile = async (req, res) => {
  // Aggregation query for the same.
  let custId = ObjectId(req.params.id);
  let resultCustomer = await Customer.aggregate([
    {
      $match: { _id: custId },
    },
  ]);
  let nextresult = resultCustomer[0];
  // return res.send(nextresult);

  nextresult.ratings = await Customer.aggregate([
    {
      $match: { _id: custId },
    },
    {
      $lookup: {
        from: "ratingcomments",
        localField: "_id",
        foreignField: "customer_id",
        as: "newoutput",
      },
    },
  ]);

  return res.send(nextresult);
  //-------------------------------------------------------------------------------
  // let resultCustomer = await Customer.findById(req.params.id).lean();
  // // return res.send(resultCustomer);
  // resultCustomer.ratings = await ratingComment
  //   .findOne({
  //     customer_id: req.params.id,
  //   })
  //   .populate("movieName");
  // res.send(resultCustomer);
  // //-----------------------------------------------------------------------------
  // // const movieId = customer.movieName;
  // // const movie = await Movies.findOne({ _id: movieId });
  // // console.log(customer.rating, movie.movieName);
  // // const sendObj = {
  // //   customer,
  // //   rating: {
  // //     movieName: movie.movieName,
  // //     Rating: customer.rating,
  // //   },
  // // };
  // // return res.send(resultCustomer.review);
  // // .populate("ratingComment");
  // resultCustomer.review.movie = await Customer.find({
  //   movieName: resultCustomer.review.movieName,
  // });
  // return res.send(resultCustomer.review.movie);
  // // return res.send(resultCustomer.review);
  // resultCustomer.review.resultMovie = await Movies.find({
  //   customer_id: req.params.id,
  // });
  // res.send(resultCustomer.review.resultMovie);
  // //   .populate("movie")
  //   .lean();
  // res.send(resultCustomer.resultMovie);
  // res.send(resultCustomer.resultMovie.review);
  // res.send({ resultCustomer });
};

exports.updateProfile = async (req, res) => {
  try {
    const updateObj = req.body;
    const example = await Customer.findByIdAndUpdate(req.params.id, updateObj);
    //Check from here.
    res.json({
      success: true,
      message: "Customer updated successfully !!",
    });
  } catch (error) {
    res.json({ err: error.message });
  }
};
