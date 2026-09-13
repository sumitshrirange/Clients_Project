const streamifier = require("streamifier");
const cloudinary = require("../config/cloudinary");

// Uploads an in-memory Multer buffer to Cloudinary via an upload stream.
// `folder` groups assets in the Cloudinary media library (e.g. "portfolio/projects").
// `resourceType` should be "image" for images or "raw"/"auto" for PDFs (resumes, certificates).
const uploadBuffer = (buffer, folder, resourceType = "image") => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: resourceType },
      (error, result) => {
        if (error) return reject(error);
        resolve({ url: result.secure_url, publicId: result.public_id });
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

// Deletes a previously uploaded asset. Safe to call with an empty/undefined
// publicId (e.g. when a field was never populated) — it simply no-ops.
const deleteAsset = async (publicId, resourceType = "image") => {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
  } catch (error) {
    // Log but never let a failed cleanup block the main request.
    console.error(`Cloudinary delete failed for ${publicId}:`, error.message);
  }
};

module.exports = { uploadBuffer, deleteAsset };
