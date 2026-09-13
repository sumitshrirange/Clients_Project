const asyncHandler = require("./asyncHandler");
const ApiError = require("./ApiError");
const ApiResponse = require("./ApiResponse");

// Generates standard list/create/update/delete handlers for models that have
// no file uploads and no bespoke logic (e.g. Education, Skill). Models that
// touch Cloudinary (Experience, Certificate, ClassWork, Project) get their
// own hand-written controllers instead.
const buildCrudController = (Model, sortField = "order") => ({
  getAll: asyncHandler(async (req, res) => {
    const docs = await Model.find().sort({ [sortField]: 1, createdAt: -1 });
    res.status(200).json(new ApiResponse(200, docs));
  }),

  getOne: asyncHandler(async (req, res) => {
    const doc = await Model.findById(req.params.id);
    if (!doc) throw new ApiError(404, "Resource not found");
    res.status(200).json(new ApiResponse(200, doc));
  }),

  create: asyncHandler(async (req, res) => {
    const doc = await Model.create(req.body);
    res.status(201).json(new ApiResponse(201, doc, "Created successfully"));
  }),

  update: asyncHandler(async (req, res) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) throw new ApiError(404, "Resource not found");
    res.status(200).json(new ApiResponse(200, doc, "Updated successfully"));
  }),

  remove: asyncHandler(async (req, res) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) throw new ApiError(404, "Resource not found");
    res.status(200).json(new ApiResponse(200, null, "Deleted successfully"));
  }),
});

module.exports = buildCrudController;
