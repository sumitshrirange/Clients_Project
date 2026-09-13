const express = require("express");
const router = express.Router();
const { getSettings, updateSettings } = require("../controllers/settingsController");
const { protect } = require("../middleware/authMiddleware");
const { uploadImage } = require("../middleware/uploadMiddleware");

router.get("/", getSettings);
router.put(
  "/",
  protect,
  uploadImage.fields([
    { name: "favicon", maxCount: 1 },
    { name: "ogImage", maxCount: 1 },
  ]),
  updateSettings
);

module.exports = router;
