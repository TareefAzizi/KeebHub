const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  content: { type: String },
  photo: { type: mongoose.Types.ObjectId, ref: "Photo" },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Comment", CommentSchema, "comments");
