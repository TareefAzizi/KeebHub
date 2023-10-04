const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Post = require("../models/Blog");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const fs = require("fs");
const app = express();

require("dotenv").config();

const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
// app.use("/uploads", express.static(__dirname + "/uploads"));

router.post("/", auth, uploadMiddleware.single("files"), async (req, res) => {
  try {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);

    const { title, summary, content } = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: req.user._id,
    });
    res.json({ postDoc });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

router.get("/", async (req, res) => {
  res.json(
    await Post.find()
      .populate("author", "username")
      .sort({ createdAt: -1 })
      .limit(20)
  );
  // let posts = await Post.find();
  // return res.json(posts);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate("author");
  res.json(postDoc);
});

// update post
router.put("/:id", uploadMiddleware.single("file"), auth, async (req, res) => {
  console.log("We are getting here");
  return;

  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }

  const { id, title, summary, content } = req.body;
  const postDoc = await Post.findById(id);
  const isAuthor =
    JSON.stringify(postDoc.author) === JSON.stringify(req.user._id);
  if (!isAuthor) {
    return res.status(400).json("you are not the author");
  }
  await postDoc.update({
    title,
    summary,
    content,
    cover: newPath ? newPath : postDoc.cover,
  });

  res.json(postDoc);
});

// delete post

router.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const post = await Post.findById(id);

    // Ensure the user is the author of the post
    // if (String(post.author) !== String(req.user._id)) {
    //   return res
    //     .status(403)
    //     .json({ error: "User is not the author of this post" });
    // }

    if (post.author._id == req.user._id || req.user.isAdmin) {
      await Post.findByIdAndDelete(id);
      res.json({ message: "Post deleted" });
    } else {
      return res
        .status(403)
        .json({ error: "User is not the author of this post" });
    }
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
