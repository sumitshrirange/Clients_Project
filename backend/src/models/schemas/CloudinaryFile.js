const mongoose = require("mongoose");

// Shared shape for any file stored in Cloudinary (images, resume PDFs, logos).
// Kept as a schema (not a model) so it can be embedded directly in parent
// documents and arrays without creating a separate collection.
const CloudinaryFileSchema = new mongoose.Schema(
  {
    url: { type: String, default: "" },
    publicId: { type: String, default: "" },
  },
  { _id: false }
);

module.exports = CloudinaryFileSchema;
