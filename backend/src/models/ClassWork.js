const mongoose = require("mongoose");
const CloudinaryFile = require("./schemas/CloudinaryFile");

const classWorkSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    category: {
      type: String,
      required: true,
      enum: [
        "UI Exercise",
        "User Flow",
        "Component",
        "Typography",
        "Color Palette",
        "Mobile Screen",
        "Design Experiment",
        "Other",
      ],
    },
    images: { type: [CloudinaryFile], default: [] },
    figmaUrl: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ClassWork", classWorkSchema);
