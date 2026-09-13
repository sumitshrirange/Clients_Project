const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const Admin = require("../models/Admin");

// Protects admin-only routes. Accepts the token either from the httpOnly
// cookie (browser sessions) or an `Authorization: Bearer <token>` header
// (useful for testing or non-cookie clients).
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  } else if (req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new ApiError(401, "Not authorized, no token provided");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      throw new ApiError(401, "Not authorized, admin no longer exists");
    }
    req.admin = admin;
    next();
  } catch (error) {
    throw new ApiError(401, "Not authorized, invalid or expired token");
  }
});

module.exports = { protect };
