const mongoose = require("mongoose");
const CloudinaryFile = require("./schemas/CloudinaryFile");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, index: true },
    category: {
      type: String,
      required: true,
      enum: [
        "Mobile App",
        "Website Design",
        "Web Application",
        "Dashboard",
        "Product Design",
        "Other",
      ],
    },
    shortDescription: { type: String, required: true, maxlength: 220 },
    fullDescription: { type: String, default: "" },

    thumbnail: { type: CloudinaryFile, default: () => ({}) },
    heroImage: { type: CloudinaryFile, default: () => ({}) },
    projectImages: { type: [CloudinaryFile], default: [] },
    visualDesignImages: { type: [CloudinaryFile], default: [] },
    userFlowImages: { type: [CloudinaryFile], default: [] },
    wireframeImages: { type: [CloudinaryFile], default: [] },

    keyPoints: { type: [String], default: [] },
    tools: { type: [String], default: [] },
    role: { type: String, default: "" },
    duration: { type: String, default: "" },

    problem: { type: String, default: "" },
    goal: { type: String, default: "" },
    targetUsers: { type: String, default: "" },

    process: {
      research: { type: String, default: "" },
      userFlow: { type: String, default: "" },
      wireframes: { type: String, default: "" },
      visualDesign: { type: String, default: "" },
      prototype: { type: String, default: "" },
    },

    solution: { type: String, default: "" },
    result: { type: String, default: "" },
    learnings: { type: String, default: "" },
    challenges: { type: String, default: "" },

    figmaUrl: { type: String, default: "" },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

projectSchema.index({ order: 1 });

module.exports = mongoose.model("Project", projectSchema);
