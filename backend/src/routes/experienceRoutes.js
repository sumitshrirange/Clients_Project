const express = require("express");
const router = express.Router();
const { getAll, getOne, create, update, remove } = require("../controllers/experienceController");
const { protect } = require("../middleware/authMiddleware");
const { uploadImage } = require("../middleware/uploadMiddleware");

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", protect, uploadImage.single("companyLogo"), create);
router.put("/:id", protect, uploadImage.single("companyLogo"), update);
router.delete("/:id", protect, remove);

module.exports = router;
