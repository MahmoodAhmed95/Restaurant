// const cloudinary = require("../utils/cloudinary");
const Restaurant = require("../models/restaurant");
const Category = require("../models/category");
const Food = require("../models/food");
module.exports = {
  index,
  showOne,
};

async function index(req, res) {
  const restaurant = await Restaurant.find({});
  const category = await Category.find({});
  const food = await Food.find({});
  //   console.log(majors);
  res.render("foods/index", {
    title: "Foods",
    restaurant,
    category,
    food,
  });
}

async function index(req, res) {
  try {
    const categories = await Category.find({});
    const foods = await Food.find({});
    const restaurants = await Restaurant.find({});
    res.render("foods/index", {
      title: "food",
      restaurants: restaurants,
      foods: foods,
      categories: categories,
    });
  } catch (error) {
    res.render("error");
  }
}

async function showOne(req, res) {
  const food = await Food.find({}).where("url").equals(req.params.name);
  const restaurant = await Restaurant.find({});
  res.render("foods/details", {
    title: "restaurant",
    food,
    restaurant,
    errorMessages: req.flash("Error"),
    successMessages: req.flash("success"),
  });
}
