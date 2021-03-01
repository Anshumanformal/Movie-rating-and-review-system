const mongoose = require("mongoose");
const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    default: null,
  },
  contact: {
    type: String,
    default: null,
  },
  // movieName: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "movie",
  // },
  // ratingComment: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "ratingComment",
  // },
});
//collection creation and exporting the module.
module.exports = mongoose.model("customer", customerSchema);
