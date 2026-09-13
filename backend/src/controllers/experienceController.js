const Experience = require("../models/Experience");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const { uploadBuffer, deleteAsset } = require("../services/cloudinaryService");

const getAll = asyncHandler(async (req, res) => {
  const docs = await Experience.find().sort({ order: 1, startDate: -1 });
  res.status(200).json(new ApiResponse(200, docs));
});

const getOne = asyncHandler(async (req, res) => {
  const doc = await Experience.findById(req.params.id);
  if (!doc) throw new ApiError(404, "Experience not found");
  res.status(200).json(new ApiResponse(200, doc));
});

const create = asyncHandler(async (req, res) => {
  const data = { ...req.body };

  if (req.file) {
    const uploaded = await uploadBuffer(req.file.buffer, "portfolio/experience-logos");
    data.companyLogo = uploaded;
  }

  const doc = await Experience.create(data);
  res.status(201).json(new ApiResponse(201, doc, "Experience added"));
});

const update = asyncHandler(async (req, res) => {
  const existing = await Experience.findById(req.params.id);
  if (!existing) throw new ApiError(404, "Experience not found");

  const data = { ...req.body };

  if (req.file) {
    if (existing.companyLogo?.publicId) {
      await deleteAsset(existing.companyLogo.publicId);
    }
    const uploaded = await uploadBuffer(req.file.buffer, "portfolio/experience-logos");
    data.companyLogo = uploaded;
  }

  const doc = await Experience.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true,
  });
  res.status(200).json(new ApiResponse(200, doc, "Experience updated"));
});

const remove = asyncHandler(async (req, res) => {
  const doc = await Experience.findByIdAndDelete(req.params.id);
  if (!doc) throw new ApiError(404, "Experience not found");
  if (doc.companyLogo?.publicId) {
    await deleteAsset(doc.companyLogo.publicId);
  }
  res.status(200).json(new ApiResponse(200, null, "Experience deleted"));
});

module.exports = { getAll, getOne, create, update, remove };
