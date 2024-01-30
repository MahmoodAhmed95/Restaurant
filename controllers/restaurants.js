const Restaurant = require("../models/restaurant");
const Food = require("../models/food");

module.exports = {
  // categories,
  index,
  showRestaurentFoods,
};

async function index(req, res) {
  try {
    const restaurants = await Restaurant.find({});
    res.render("restaurants/index", {
      title: "restaurant",
      restaurants: restaurants,
    });
  } catch (error) {
    res.render("error");
  }
}
async function showRestaurentFoods(req, res) {
  // console.log(`=========>>>>${req.params.name}`);
  const restaurants = await Restaurant.find({});
  // const category = await Category.findById(req.params.name);
  const restaurant = await Restaurant.find({})
    .where("url")
    .equals(req.params.name);
  const foods = await Food.find({})
    .where("restaurantUrl")
    .equals(req.params.name);
  res.render("foods/index", {
    title: restaurant.name,
    foods: foods,
    restaurants,
  });
}
