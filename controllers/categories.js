const Category = require("../models/category");
const Restaurant = require("../models/restaurant");

module.exports = {
  // categories,
  index,
  showCategoryRestaurents,
};

async function index(req, res) {
  try {
    const categories = await Category.find({});
    res.render("categories/index", {
      title: "category",
      categories: categories,
    });
  } catch (error) {
    res.render("error");
  }
}
async function showCategoryRestaurents(req, res) {
  // console.log(`=========>>>>${req.params.name}`);
  const categories = await Category.find({});
  // const category = await Category.findById(req.params.name);
  const category = await Category.find({}).where("url").equals(req.params.name);
  const restaurants = await Restaurant.find({})
    .where("categoryUrl")
    .equals(req.params.name);
  res.render("restaurants/index", {
    title: category.name,
    restaurants: restaurants,
    categories,
  });
}
