const Customer = require("../models/Customer");
const Movies = require("../models/Movies");
const ratingComment = require("../models/ratingComments");

//Routes for movie.

exports.enterMovie = async (req, res) => {
  const newmovie = await new Movies(req.body).save();
  res.send(newmovie);
};

exports.updateMovie = async (req, res) => {
  const { movieName, id } = req.body;
  const found = await Movies.findById(id);
  if (!found) return res.status(400).json({ message: "No Movie found !!!" });
  found.movieName = movieName;
  await found.save();
  return res.json({ message: "Movie updated successfully !!" });
};

exports.getMovie = async (req, res) => {
  const result = await Movies.findById(req.params.id)
    .populate("customer_id ")
    .lean();
  // console.log(result);

  // result.customer_id = await Customer.findById(req.body.id)
  //   .populate("ratingComment")
  //   .lean();
  // // return console.log(result.customer_id);
  // result.customer_id.review = await ratingComment.find({
  //   customer_id: result.customer_id._id,
  // });
  // res.send(result);

  result.ratingReview = await ratingComment
    .find({ movieName: result._id })
    .populate("customer_id");
  res.send(result);
};

exports.deleteMovie = async (req, res) => {
  // const { id } = req.body;
  // const result = await Movies.findByIdAndDelete(id);
  // res.json({ message: "Movie deleted successfully", result: result });
  // Check this.
};

//Routes for review.

exports.addReview = async (req, res) => {
  let { rating, comment } = req.body;
  let result = await new ratingComment({
    rating: rating,
    comment: comment,
    movieName: req.body.movieName,
    customer_id: req.body.customer_id,
  }).save();
  res.send(result);
};

exports.updateReview = async (req, res) => {
  let res1 = await ratingComment.find({ id: req.params.id });
  return console.log(res);
  //check.
  if (!res) res.send("Review already exists.");
  else {
  }
};
exports.getReview = async (req, res) => {
  let rev = await ratingComment
    .findById(req.params.id)
    .populate("customer_id movieName");
  res.send(rev);
};
exports.deleteReview = async (req, res) => {
  let rev = await ratingComment.findByIdAndDelete(req.params.id);
  res.send(rev);
};
