// const cloudinary = require("../utils/cloudinary");
const Restaurant = require("../models/restaurant");
const Category = require("../models/category");
module.exports = {
  index,
  showOne,
};

async function index(req, res) {
  const restaurant = await Restaurant.find({});
  const category = await Category.find({});
  //   const cities = await Branch.find({});
  //   console.log(majors);
  res.render("restaurants/index", {
    title: "Restaurants",
    restaurant,
    category,
  });
}

async function index(req, res) {
  try {
    const categories = await Category.find({});
    // const cities = await Branch.find({});
    const restaurants = await Restaurant.find({});
    res.render("restaurants/index", {
      title: "restaurant",
      restaurants: restaurants,
      //   cities: cities,
      categories: categories,
    });
  } catch (error) {
    res.render("error");
  }
}

async function showOne(req, res) {
  const restaurant = await Restaurant.findById(req.params.name);
  const category = await Category.find({});
  res.render("restaurants/details", {
    title: "restaurant",
    restaurant,
    category,
    errorMessages: req.flash("Error"),
    successMessages: req.flash("success"),
  });
}
