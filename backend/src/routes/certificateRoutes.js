const express = require("express");
const router = express.Router();
const { getAll, getOne, create, update, remove } = require("../controllers/certificateController");
const { protect } = require("../middleware/authMiddleware");
const { uploadDocument } = require("../middleware/uploadMiddleware");

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", protect, uploadDocument.single("certificateFile"), create);
router.put("/:id", protect, uploadDocument.single("certificateFile"), update);
router.delete("/:id", protect, remove);

module.exports = router;
