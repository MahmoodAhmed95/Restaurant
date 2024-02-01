const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const foodSchema = new Schema(
  {
    name: String,
    restaurantUrl: String,
    price: Number,
    description: String,
    url: String,
    profile_img: String,
    cloudinary_id: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Food", foodSchema);
