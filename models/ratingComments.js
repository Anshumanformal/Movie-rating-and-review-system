const mongoose = require("mongoose");

const ratingCommentSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },

  movieName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "movie",
  },

  customer_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customer",
    },
  ],
});

const ratingComment = mongoose.model("ratingComment", ratingCommentSchema);
module.exports = ratingComment;
