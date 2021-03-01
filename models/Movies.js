const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  movieName: {
    type: String,
    required: true,
  },
  // customer_id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "customer",
  //   // ratingComment: {
  //   //   type: mongoose.Schema.Types.ObjectId,
  //   //   ref: "ratingComment",
  //   // },
  // },
  // ratingComment: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "ratingComment",
  // },
});
module.exports = mongoose.model("movie", movieSchema);
