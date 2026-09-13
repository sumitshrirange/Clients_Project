const Admin = require("../models/Admin");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const { sendTokenResponse } = require("../utils/generateToken");
const { uploadBuffer, deleteAsset } = require("../services/cloudinaryService");

// @desc    Admin login
// @route   POST /api/auth/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const admin = await Admin.findOne({ email: email.toLowerCase() }).select("+password");
  if (!admin || !(await admin.matchPassword(password))) {
    throw new ApiError(401, "Invalid email or password");
  }

  sendTokenResponse(admin, 200, res);
});

// @desc    Logout admin (clears auth cookie)
// @route   POST /api/auth/logout
// @access  Private
const logout = asyncHandler(async (req, res) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 1000),
    httpOnly: true,
  });
  res.status(200).json(new ApiResponse(200, null, "Logged out successfully"));
});

// @desc    Get currently logged-in admin
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, req.admin));
});

// @desc    Update admin name/email
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
  const { name, email } = req.body;
  const admin = await Admin.findById(req.admin._id);

  if (name) admin.name = name;
  if (email) admin.email = email.toLowerCase();

  if (req.file) {
    if (admin.avatar?.publicId) {
      await deleteAsset(admin.avatar.publicId);
    }
    const uploaded = await uploadBuffer(req.file.buffer, "portfolio/admin-avatar");
    admin.avatar = { url: uploaded.url, publicId: uploaded.publicId };
  }

  await admin.save();
  res.status(200).json(new ApiResponse(200, admin, "Profile updated"));
});

// @desc    Update admin password
// @route   PUT /api/auth/password
// @access  Private
const updatePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    throw new ApiError(400, "Current and new password are required");
  }

  const admin = await Admin.findById(req.admin._id).select("+password");
  if (!(await admin.matchPassword(currentPassword))) {
    throw new ApiError(401, "Current password is incorrect");
  }

  admin.password = newPassword;
  await admin.save();

  sendTokenResponse(admin, 200, res);
});

module.exports = { login, logout, getMe, updateProfile, updatePassword };
