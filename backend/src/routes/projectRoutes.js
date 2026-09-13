const express = require("express");
const router = express.Router();
const { getAll, getBySlug, getOne, create, update, remove } = require("../controllers/projectController");
const { protect } = require("../middleware/authMiddleware");
const { uploadImage } = require("../middleware/uploadMiddleware");

const projectUploadFields = uploadImage.fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "heroImage", maxCount: 1 },
  { name: "projectImages", maxCount: 20 },
  { name: "visualDesignImages", maxCount: 20 },
  { name: "userFlowImages", maxCount: 20 },
  { name: "wireframeImages", maxCount: 20 },
]);

router.get("/", getAll);
router.get("/slug/:slug", getBySlug);
router.get("/:id", getOne);
router.post("/", protect, projectUploadFields, create);
router.put("/:id", protect, projectUploadFields, update);
router.delete("/:id", protect, remove);

module.exports = router;
