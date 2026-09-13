const mongoose = require("mongoose");
const CloudinaryFile = require("./schemas/CloudinaryFile");

const certificateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    organization: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    certificateFile: { type: CloudinaryFile, default: () => ({}) },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Certificate", certificateSchema);
