const mongoose = require("mongoose");

const PhotosSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comments: [
    {
      comment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
      _id: false,
    },
  ],

  likes: [
    {
      like: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Like",
      },
      _id: false,
    },
  ],

  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
});
module.exports = mongoose.model("Photo", PhotosSchema, "photos");
