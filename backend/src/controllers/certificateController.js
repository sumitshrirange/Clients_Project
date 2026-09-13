const Certificate = require("../models/Certificate");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const { uploadBuffer, deleteAsset } = require("../services/cloudinaryService");

const getAll = asyncHandler(async (req, res) => {
  const docs = await Certificate.find().sort({ order: 1, date: -1 });
  res.status(200).json(new ApiResponse(200, docs));
});

const getOne = asyncHandler(async (req, res) => {
  const doc = await Certificate.findById(req.params.id);
  if (!doc) throw new ApiError(404, "Certificate not found");
  res.status(200).json(new ApiResponse(200, doc));
});

const create = asyncHandler(async (req, res) => {
  const data = { ...req.body };

  if (req.file) {
    const resourceType = req.file.mimetype === "application/pdf" ? "raw" : "image";
    const uploaded = await uploadBuffer(req.file.buffer, "portfolio/certificates", resourceType);
    data.certificateFile = uploaded;
  }

  const doc = await Certificate.create(data);
  res.status(201).json(new ApiResponse(201, doc, "Certificate added"));
});

const update = asyncHandler(async (req, res) => {
  const existing = await Certificate.findById(req.params.id);
  if (!existing) throw new ApiError(404, "Certificate not found");

  const data = { ...req.body };

  if (req.file) {
    if (existing.certificateFile?.publicId) {
      await deleteAsset(existing.certificateFile.publicId);
    }
    const resourceType = req.file.mimetype === "application/pdf" ? "raw" : "image";
    const uploaded = await uploadBuffer(req.file.buffer, "portfolio/certificates", resourceType);
    data.certificateFile = uploaded;
  }

  const doc = await Certificate.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true,
  });
  res.status(200).json(new ApiResponse(200, doc, "Certificate updated"));
});

const remove = asyncHandler(async (req, res) => {
  const doc = await Certificate.findByIdAndDelete(req.params.id);
  if (!doc) throw new ApiError(404, "Certificate not found");
  if (doc.certificateFile?.publicId) {
    await deleteAsset(doc.certificateFile.publicId);
  }
  res.status(200).json(new ApiResponse(200, null, "Certificate deleted"));
});

module.exports = { getAll, getOne, create, update, remove };
