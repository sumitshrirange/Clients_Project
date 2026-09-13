const mongoose = require("mongoose");
const CloudinaryFile = require("./schemas/CloudinaryFile");

const experienceSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    current: { type: Boolean, default: false },
    description: { type: String, default: "" },
    companyLogo: { type: CloudinaryFile, default: () => ({}) },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Experience", experienceSchema);
