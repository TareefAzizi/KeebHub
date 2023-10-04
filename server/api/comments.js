const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");
const auth = require("../middleware/auth");
const mongoose = require("mongoose");
const Photo = require("../models/Photo");

// GET ALL COMMENTS
router.get("/:photoId", async (req, res) => {
  try {
    let comments = await Comment.find({ photo: req.params.photoId }).populate(
      "user"
    ); // add this line to populate user details
    return res.json(comments);
  } catch (e) {
    return res.status(400).json({ msg: "Cannot get comments" });
  }
});

//ADD
router.post("/:photoId", auth, async (req, res) => {
  try {
    //DOES THE POST EXIST TO MAKE A COMMENT?
    if (!mongoose.Types.ObjectId.isValid(req.params.photoId)) {
      return res.json({ msg: "This photo doesn't exist" });
    }

    let comment = await Comment.create({
      content: req.body.content,
      photo: req.params.photoId,
      user: req.user._id,
    });

    let photo = await Photo.findById(req.params.photoId);
    photo.comments.push({ comment: comment._id });
    await photo.save();
    return res.json({ msg: "Comment added successfully" });
  } catch (e) {
    return res.status(400).json({ e, msg: "Cannot comment on this photo" });
  }
});

//GET ALL COMMENTS
//get all comments in that post

//UPDATE COMMENT

//DELETE COMMENT

module.exports = router;
