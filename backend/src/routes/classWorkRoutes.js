const express = require("express");
const router = express.Router();
const {
  getAll,
  getOne,
  create,
  update,
  removeImage,
  remove,
} = require("../controllers/classWorkController");
const { protect } = require("../middleware/authMiddleware");
const { uploadImage } = require("../middleware/uploadMiddleware");

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", protect, uploadImage.array("images", 15), create);
router.put("/:id", protect, uploadImage.array("images", 15), update);
router.delete("/:id/images/:publicId", protect, removeImage);
router.delete("/:id", protect, remove);

module.exports = router;
