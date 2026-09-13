const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ["UX Skills", "UI Skills", "Research", "Design Tools"],
    },
    icon: { type: String, default: "" }, // lucide-react icon name or Cloudinary icon url
    proficiency: { type: Number, min: 0, max: 100, default: 80 },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Skill", skillSchema);
