const express = require("express");
const router = express.Router();
const Photo = require("../models/Photo");
const auth = require("../middleware/auth");
const Comment = require("../models/Comment");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/"); // destination of the image
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname); // filename for the image
  },
});

const upload = multer({ storage: storage });

//ADD Photos localhost:PORT/posts (POST method)
router.post("/", auth, upload.single("image"), (req, res) => {
  const { title, content } = req.body;

  if (title.length < 1)
    return res.status(400).json({ msg: "Title must not be empty" });

  if (content.length < 1)
    return res.status(400).json({ msg: "Content must not be empty" });

  const photo = new Photo({
    title,
    content,
    imageUrl: req.file.path,
    user: req.user._id,
  });
  photo.save();
  return res.json({ msg: "Photo added successfully", photo });
});

// GET ALL PHOTO
// router.get("/", async (req, res) => {
//   try {
//     const photos = await Photo.find();
//     return res.json(photos);
//   } catch (e) {
//     return res.json({ e, msg: "Cannot get photos" });
//   }
// });

router.get("/", async (req, res) => {
  try {
    const posts = await Photo.find()
      .populate("comments.comment")
      .populate("user")
      .populate("likes.like");
    // console.log("posts", posts);
    return res.json(posts);
  } catch (e) {
    return res.json({ e, msg: "Cannot get photos" });
  }
});

//GET PHOTO BY ID
router.get("/:id", async (req, res) => {
  try {
    let photo = await Photo.findById({ _id: req.params.id });
    return res.json(photo);
  } catch (e) {
    return res.json({ e, msg: "Cannot get photo" });
  }
});

//UPDATE A PHOTO
router.put("/:id", auth, async (req, res) => {
  try {
    let currentPhoto = await Photo.findById(req.params.id);

    if (!currentPhoto) return res.json({ msg: "No photo found" });

    if (currentPhoto.user != req.user._id)
      return res.status(401).json({ msg: "Unauthorized" });

    let photo = await Photo.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updated_at: new Date().toISOString() },
      { new: true }
    );
    return res.json({ msg: "Photo updated successfully", photo });
  } catch (e) {
    return res.json({ e, msg: "Cannot update photo" });
  }
});

//DELETE A PHOTO
router.delete("/:id", auth, async (req, res) => {
  try {
    let photo = await Photo.findById(req.params.id);

    if (!photo) return res.json({ msg: "Photo not found" });

    // if (photo.user != req.user._id)

    console.log("photo", photo.user, "requser", req.params);

    if (photo.user == req.user._id || req.user.isAdmin) {
      let deletedPhoto = await Photo.findByIdAndDelete(req.params.id);
      return res.json({ msg: "Photo deleted successfully", deletedPhoto });
    }

    return res.status(401).json({ msg: "Unauthorized" });
    // let deletedPhoto = await Photo.findByIdAndDelete(req.params.id);
    return res.json({ msg: "Photo deleted successfully", deletedPhoto });
  } catch (e) {
    return res.json({ e, msg: "Cannot delete photo" });
  }
});

module.exports = router;
