const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const LikeSchema = new Schema({
  user: { type: String },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
});

module.exports = mongoose.model("Like", LikeSchema);
