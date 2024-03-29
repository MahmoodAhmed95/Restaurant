const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const categorySchema = new Schema(
  {
    name: String,
    url: String,
    profile_img: String,
    cloudinary_id: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", categorySchema);
