const slugify = require("slugify");
const Project = require("../models/Project");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const { uploadBuffer, deleteAsset } = require("../services/cloudinaryService");

const GALLERY_FIELDS = [
  "projectImages",
  "visualDesignImages",
  "userFlowImages",
  "wireframeImages",
];

// Fields like `keyPoints`, `tools`, and `process` arrive as JSON strings when
// sent via multipart/form-data (required because files share the same
// request). This safely parses them, falling back to the raw value for
// plain JSON requests where the body is already an object/array.
const parseIfJson = (value, fallback) => {
  if (value === undefined) return fallback;
  if (typeof value !== "string") return value;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

const buildProjectData = (body) => {
  const data = { ...body };
  if (body.keyPoints !== undefined) data.keyPoints = parseIfJson(body.keyPoints, []);
  if (body.tools !== undefined) data.tools = parseIfJson(body.tools, []);
  if (body.process !== undefined) data.process = parseIfJson(body.process, {});
  if (body.featured !== undefined) data.featured = body.featured === "true" || body.featured === true;
  if (body.order !== undefined) data.order = Number(body.order);
  return data;
};

const getAll = asyncHandler(async (req, res) => {
  const { category, featured } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (featured !== undefined) filter.featured = featured === "true";

  const docs = await Project.find(filter).sort({ order: 1, createdAt: -1 });
  res.status(200).json(new ApiResponse(200, docs));
});

const getBySlug = asyncHandler(async (req, res) => {
  const doc = await Project.findOne({ slug: req.params.slug });
  if (!doc) throw new ApiError(404, "Project not found");
  res.status(200).json(new ApiResponse(200, doc));
});

const getOne = asyncHandler(async (req, res) => {
  const doc = await Project.findById(req.params.id);
  if (!doc) throw new ApiError(404, "Project not found");
  res.status(200).json(new ApiResponse(200, doc));
});

const create = asyncHandler(async (req, res) => {
  const data = buildProjectData(req.body);

  if (!data.slug && data.title) {
    data.slug = slugify(data.title, { lower: true, strict: true });
  }

  const files = req.files || {};

  if (files.thumbnail?.[0]) {
    data.thumbnail = await uploadBuffer(files.thumbnail[0].buffer, "portfolio/projects/thumbnails");
  }
  if (files.heroImage?.[0]) {
    data.heroImage = await uploadBuffer(files.heroImage[0].buffer, "portfolio/projects/hero");
  }
  for (const field of GALLERY_FIELDS) {
    if (files[field]?.length) {
      data[field] = await Promise.all(
        files[field].map((file) => uploadBuffer(file.buffer, `portfolio/projects/${field}`))
      );
    }
  }

  const doc = await Project.create(data);
  res.status(201).json(new ApiResponse(201, doc, "Project created"));
});

const update = asyncHandler(async (req, res) => {
  const existing = await Project.findById(req.params.id);
  if (!existing) throw new ApiError(404, "Project not found");

  const data = buildProjectData(req.body);
  const files = req.files || {};

  if (data.title && !req.body.slug) {
    data.slug = slugify(data.title, { lower: true, strict: true });
  }

  if (files.thumbnail?.[0]) {
    if (existing.thumbnail?.publicId) await deleteAsset(existing.thumbnail.publicId);
    data.thumbnail = await uploadBuffer(files.thumbnail[0].buffer, "portfolio/projects/thumbnails");
  }
  if (files.heroImage?.[0]) {
    if (existing.heroImage?.publicId) await deleteAsset(existing.heroImage.publicId);
    data.heroImage = await uploadBuffer(files.heroImage[0].buffer, "portfolio/projects/hero");
  }
  // Gallery fields are replaced wholesale on update — the admin UI should
  // resend the full desired set (existing keepers + new uploads).
  for (const field of GALLERY_FIELDS) {
    if (files[field]?.length) {
      const oldAssets = existing[field] || [];
      await Promise.all(oldAssets.map((img) => deleteAsset(img.publicId)));
      data[field] = await Promise.all(
        files[field].map((file) => uploadBuffer(file.buffer, `portfolio/projects/${field}`))
      );
    }
  }

  const doc = await Project.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true,
  });
  res.status(200).json(new ApiResponse(200, doc, "Project updated"));
});

const remove = asyncHandler(async (req, res) => {
  const doc = await Project.findByIdAndDelete(req.params.id);
  if (!doc) throw new ApiError(404, "Project not found");

  const cleanupTargets = [
    doc.thumbnail?.publicId,
    doc.heroImage?.publicId,
    ...GALLERY_FIELDS.flatMap((field) => (doc[field] || []).map((img) => img.publicId)),
  ].filter(Boolean);

  await Promise.all(cleanupTargets.map((publicId) => deleteAsset(publicId)));

  res.status(200).json(new ApiResponse(200, null, "Project deleted"));
});

module.exports = { getAll, getBySlug, getOne, create, update, remove };
