const ClassWork = require("../models/ClassWork");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const { uploadBuffer, deleteAsset } = require("../services/cloudinaryService");

const getAll = asyncHandler(async (req, res) => {
  const { category } = req.query;
  const filter = category ? { category } : {};
  const docs = await ClassWork.find(filter).sort({ order: 1, createdAt: -1 });
  res.status(200).json(new ApiResponse(200, docs));
});

const getOne = asyncHandler(async (req, res) => {
  const doc = await ClassWork.findById(req.params.id);
  if (!doc) throw new ApiError(404, "Class work item not found");
  res.status(200).json(new ApiResponse(200, doc));
});

const create = asyncHandler(async (req, res) => {
  const data = { ...req.body };

  if (req.files?.length) {
    const uploads = await Promise.all(
      req.files.map((file) => uploadBuffer(file.buffer, "portfolio/class-work"))
    );
    data.images = uploads;
  }

  const doc = await ClassWork.create(data);
  res.status(201).json(new ApiResponse(201, doc, "Class work added"));
});

const update = asyncHandler(async (req, res) => {
  const existing = await ClassWork.findById(req.params.id);
  if (!existing) throw new ApiError(404, "Class work item not found");

  const data = { ...req.body };

  // New images are appended to the existing gallery rather than replacing it,
  // so removing individual images (below) stays independent of edits here.
  if (req.files?.length) {
    const uploads = await Promise.all(
      req.files.map((file) => uploadBuffer(file.buffer, "portfolio/class-work"))
    );
    data.images = [...existing.images, ...uploads];
  }

  const doc = await ClassWork.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true,
  });
  res.status(200).json(new ApiResponse(200, doc, "Class work updated"));
});

// @desc    Remove a single image from a class work item's gallery
// @route   DELETE /api/class-work/:id/images/:publicId
const removeImage = asyncHandler(async (req, res) => {
  const { id, publicId } = req.params;
  const doc = await ClassWork.findById(id);
  if (!doc) throw new ApiError(404, "Class work item not found");

  const decodedPublicId = decodeURIComponent(publicId);
  await deleteAsset(decodedPublicId);
  doc.images = doc.images.filter((img) => img.publicId !== decodedPublicId);
  await doc.save();

  res.status(200).json(new ApiResponse(200, doc, "Image removed"));
});

const remove = asyncHandler(async (req, res) => {
  const doc = await ClassWork.findByIdAndDelete(req.params.id);
  if (!doc) throw new ApiError(404, "Class work item not found");
  await Promise.all((doc.images || []).map((img) => deleteAsset(img.publicId)));
  res.status(200).json(new ApiResponse(200, null, "Class work deleted"));
});

module.exports = { getAll, getOne, create, update, removeImage, remove };
