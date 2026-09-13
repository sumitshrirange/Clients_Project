const Profile = require("../models/Profile");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const { uploadBuffer, deleteAsset } = require("../services/cloudinaryService");

// Returns the single Profile document, creating it with schema defaults the
// first time it's requested so the frontend always has something to render.
const getOrCreateProfile = async () => {
  let profile = await Profile.findOne();
  if (!profile) profile = await Profile.create({});
  return profile;
};

// @desc    Get public profile / About-section content
// @route   GET /api/profile
// @access  Public
const getProfile = asyncHandler(async (req, res) => {
  const profile = await getOrCreateProfile();
  res.status(200).json(new ApiResponse(200, profile));
});

// @desc    Update profile text fields + optional profile/cutout images
// @route   PUT /api/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
  const profile = await getOrCreateProfile();
  const data = { ...req.body };

  if (data.expertiseChips !== undefined && typeof data.expertiseChips === "string") {
    try {
      data.expertiseChips = JSON.parse(data.expertiseChips);
    } catch {
      // leave as-is if it wasn't valid JSON
    }
  }
  if (data.socialLinks !== undefined && typeof data.socialLinks === "string") {
    try {
      data.socialLinks = JSON.parse(data.socialLinks);
    } catch {
      // leave as-is
    }
  }

  const files = req.files || {};

  if (files.profileImage?.[0]) {
    if (profile.profileImage?.publicId) await deleteAsset(profile.profileImage.publicId);
    data.profileImage = await uploadBuffer(files.profileImage[0].buffer, "portfolio/profile");
  }
  if (files.cutoutImage?.[0]) {
    if (profile.cutoutImage?.publicId) await deleteAsset(profile.cutoutImage.publicId);
    data.cutoutImage = await uploadBuffer(files.cutoutImage[0].buffer, "portfolio/profile");
  }

  Object.assign(profile, data);
  await profile.save();

  res.status(200).json(new ApiResponse(200, profile, "Profile updated"));
});

// @desc    Upload/replace resume PDF
// @route   PUT /api/profile/resume
// @access  Private
const updateResume = asyncHandler(async (req, res) => {
  const profile = await getOrCreateProfile();

  if (!req.file) {
    return res.status(400).json(new ApiResponse(400, null, "No resume file provided"));
  }

  if (profile.resume?.publicId) {
    await deleteAsset(profile.resume.publicId, "raw");
  }

  const uploaded = await uploadBuffer(req.file.buffer, "portfolio/resume", "raw");
  profile.resume = uploaded;
  await profile.save();

  res.status(200).json(new ApiResponse(200, profile, "Resume updated"));
});

module.exports = { getProfile, updateProfile, updateResume };
