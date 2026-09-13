const PortfolioSettings = require("../models/PortfolioSettings");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const { uploadBuffer, deleteAsset } = require("../services/cloudinaryService");

const getOrCreateSettings = async () => {
  let settings = await PortfolioSettings.findOne();
  if (!settings) settings = await PortfolioSettings.create({});
  return settings;
};

// @desc    Get site-wide portfolio settings
// @route   GET /api/settings
// @access  Public
const getSettings = asyncHandler(async (req, res) => {
  const settings = await getOrCreateSettings();
  res.status(200).json(new ApiResponse(200, settings));
});

// @desc    Update site-wide portfolio settings
// @route   PUT /api/settings
// @access  Private
const updateSettings = asyncHandler(async (req, res) => {
  const settings = await getOrCreateSettings();
  const data = { ...req.body };

  if (data.socialLinks !== undefined && typeof data.socialLinks === "string") {
    try {
      data.socialLinks = JSON.parse(data.socialLinks);
    } catch {
      // leave as-is
    }
  }

  const files = req.files || {};

  if (files.favicon?.[0]) {
    if (settings.favicon?.publicId) await deleteAsset(settings.favicon.publicId);
    data.favicon = await uploadBuffer(files.favicon[0].buffer, "portfolio/settings");
  }
  if (files.ogImage?.[0]) {
    if (settings.ogImage?.publicId) await deleteAsset(settings.ogImage.publicId);
    data.ogImage = await uploadBuffer(files.ogImage[0].buffer, "portfolio/settings");
  }

  Object.assign(settings, data);
  await settings.save();

  res.status(200).json(new ApiResponse(200, settings, "Settings updated"));
});

module.exports = { getSettings, updateSettings };
