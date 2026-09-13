const Project = require("../models/Project");
const ClassWork = require("../models/ClassWork");
const Skill = require("../models/Skill");
const Experience = require("../models/Experience");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

// @desc    Admin dashboard overview stats
// @route   GET /api/dashboard
// @access  Private
const getDashboardStats = asyncHandler(async (req, res) => {
  const [totalProjects, totalClassWork, totalSkills, totalExperience, recentProjects] =
    await Promise.all([
      Project.countDocuments(),
      ClassWork.countDocuments(),
      Skill.countDocuments(),
      Experience.countDocuments(),
      Project.find().sort({ createdAt: -1 }).limit(5).select("title category thumbnail createdAt"),
    ]);

  res.status(200).json(
    new ApiResponse(200, {
      totalProjects,
      totalClassWork,
      totalSkills,
      totalExperience,
      recentProjects,
    })
  );
});

module.exports = { getDashboardStats };
