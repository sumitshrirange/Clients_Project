const mongoose = require("mongoose");
const CloudinaryFile = require("./schemas/CloudinaryFile");

// Singleton-style document: the app always reads/writes the single Profile
// document (created on first write) rather than querying by id.
const profileSchema = new mongoose.Schema(
  {
    name: { type: String, default: "Payal Wangsing" },
    designation: { type: String, default: "UI/UX Designer" },
    tagline: {
      type: String,
      default: "Designing intuitive experiences that solve real problems.",
    },
    introduction: { type: String, default: "" },
    philosophy: { type: String, default: "" },
    profileImage: { type: CloudinaryFile, default: () => ({}) },
    cutoutImage: { type: CloudinaryFile, default: () => ({}) },
    resume: { type: CloudinaryFile, default: () => ({}) },
    expertiseChips: {
      type: [String],
      default: [
        "UI/UX Design",
        "Product Design",
        "User Research",
        "Wireframing",
        "Prototyping",
        "Design Systems",
      ],
    },
    socialLinks: {
      email: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      behance: { type: String, default: "" },
      dribbble: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
