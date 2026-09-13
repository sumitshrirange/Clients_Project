const express = require("express");
const router = express.Router();
const { getProfile, updateProfile, updateResume } = require("../controllers/profileController");
const { protect } = require("../middleware/authMiddleware");
const { uploadImage, uploadDocument } = require("../middleware/uploadMiddleware");

router.get("/", getProfile);
router.put(
  "/",
  protect,
  uploadImage.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "cutoutImage", maxCount: 1 },
  ]),
  updateProfile
);
router.put("/resume", protect, uploadDocument.single("resume"), updateResume);

module.exports = router;
