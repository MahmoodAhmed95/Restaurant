const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const restaurantSchema = new Schema(
  {
    name: String,
    categoryUrl: String,
    url: String,
    profile_img: String,
    cloudinary_id: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);
