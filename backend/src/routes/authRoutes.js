const express = require("express");
const router = express.Router();
const { login, logout, getMe, updateProfile, updatePassword } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const { uploadImage } = require("../middleware/uploadMiddleware");

router.post("/login", login);
router.post("/logout", protect, logout);
router.get("/me", protect, getMe);
router.put("/profile", protect, uploadImage.single("avatar"), updateProfile);
router.put("/password", protect, updatePassword);

module.exports = router;
