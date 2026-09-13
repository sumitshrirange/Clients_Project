const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

// Signs a JWT for the given admin id and sets it as an httpOnly cookie so the
// session survives page refreshes without exposing the token to client JS.
// The same token is also returned in the JSON body so SPA clients that
// prefer an Authorization header can store it themselves.
const sendTokenResponse = (admin, statusCode, res) => {
  const token = generateToken(admin._id);

  const cookieExpiresDays = Number(process.env.JWT_COOKIE_EXPIRES_DAYS) || 7;

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    expires: new Date(Date.now() + cookieExpiresDays * 24 * 60 * 60 * 1000),
  });

  res.status(statusCode).json({
    success: true,
    token,
    admin: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      avatar: admin.avatar,
    },
  });
};

module.exports = { generateToken, sendTokenResponse };
