// One-time setup script: creates the initial Admin account from the
// SEED_ADMIN_* values in .env, plus empty Profile/PortfolioSettings
// singletons so the frontend has something to read on first load.
// Run with: npm run seed
require("dotenv").config();
const connectDB = require("../config/db");
const Admin = require("../models/Admin");
const Profile = require("../models/Profile");
const PortfolioSettings = require("../models/PortfolioSettings");

const run = async () => {
  await connectDB();

  const email = (process.env.SEED_ADMIN_EMAIL || "").toLowerCase();
  const existing = await Admin.findOne({ email });

  if (existing) {
    console.log(`Admin already exists for ${email}, skipping admin creation.`);
  } else {
    await Admin.create({
      name: process.env.SEED_ADMIN_NAME || "Admin",
      email,
      password: process.env.SEED_ADMIN_PASSWORD || "ChangeMe123!",
    });
    console.log(`Admin created for ${email}`);
  }

  const profileExists = await Profile.findOne();
  if (!profileExists) {
    await Profile.create({});
    console.log("Default Profile document created");
  }

  const settingsExist = await PortfolioSettings.findOne();
  if (!settingsExist) {
    await PortfolioSettings.create({});
    console.log("Default PortfolioSettings document created");
  }

  console.log("Seed complete.");
  process.exit(0);
};

run().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
