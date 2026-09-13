const mongoose = require("mongoose");
const CloudinaryFile = require("./schemas/CloudinaryFile");

// Singleton document holding site-wide, SEO, and footer content that isn't
// tied to any single section model above.
const portfolioSettingsSchema = new mongoose.Schema(
  {
    siteTitle: { type: String, default: "Payal Wangsing | UI/UX Designer" },
    metaDescription: {
      type: String,
      default:
        "Portfolio of Payal Wangsing, a UI/UX Designer crafting intuitive digital experiences.",
    },
    favicon: { type: CloudinaryFile, default: () => ({}) },
    ogImage: { type: CloudinaryFile, default: () => ({}) },
    footerHeadline: { type: String, default: "Let's Create Something Amazing" },
    contactEmail: { type: String, default: "" },
    socialLinks: {
      linkedin: { type: String, default: "" },
      behance: { type: String, default: "" },
      dribbble: { type: String, default: "" },
    },
    totalProjectsOverride: { type: Number, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PortfolioSettings", portfolioSettingsSchema);
