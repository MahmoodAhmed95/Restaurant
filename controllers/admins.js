const Category = require("../models/category");
const Restaurant = require("../models/restaurant");
const Food = require("../models/food");
const User = require("../models/user");
const cloudinary = require("../utils/cloudinary");

module.exports = {
  index,
  categoryIndex,
  restaurantsIndex,
  foodsIndex,
  usersIndex,
  createCategory,
  createRestaurant,
  createFood,
  createUser,
};

// =========================================================================================
// =========================================================================================

// Start "Dashboard" Controls

function index(req, res) {
  res.render("admins/dashboard", { title: "Dashboard" });
}

// End Of "Dashboard" Controls

// =========================================================================================
// =========================================================================================

// Start "Categories" Controls

async function categoryIndex(req, res) {
  const category = await Category.find({});
  res.render("admins/categories", {
    title: "Categories",
    category,
    errorMessages: req.flash("Error"),
    successMessages: req.flash("success"),
  });
}

async function createCategory(req, res) {
  try {
    const categoryName = await Category.findOne({
      name: { $regex: new RegExp("^" + req.body.name.toLowerCase(), "i") },
    });

    if (categoryName) {
      req.flash("error", "Category Name Already Exists!");
      res.redirect("/admins/categories");
    } else {
      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      // Create category with Cloudinary details
      await Category.create({
        name: req.body.name,
        url: req.body.name,
        profile_img: result.secure_url,
        cloudinary_id: result.public_id,
      });

      req.flash("success", "Category Created successfully!");
      res.redirect("/admins"); // then change to /admins/categories
    }
  } catch (error) {
    console.error(error);
    req.flash("error", "An error occurred during category creation.");
    res.redirect("/admins/categories");
  }
}

// =========================================================================================
// =========================================================================================

// Start "Restaurants" Controls

async function restaurantsIndex(req, res) {
  try {
    const categories = await Category.find({});
    const restaurants = await Restaurant.find({});
    const foods = await Food.find({});
    res.render("admins/restaurants", {
      title: "Restaurants",
      restaurants: restaurants,
      categories: categories,
      foods: foods,
      errorMessages: req.flash("Error"),
      successMessages: req.flash("success"),
    });
  } catch (error) {
    res.render("error");
  }
}

// create new restaurant
async function createRestaurant(req, res) {
  try {
    const restaurantName = await Restaurant.findOne({
      name: { $regex: new RegExp("^" + req.body.name.toLowerCase(), "i") },
    });
    //if restaurant name already available
    if (restaurantName) {
      req.flash("Error", `Restaurant Name Already Exist!`);
      res.redirect("/admins/restaurants");
    } else {
      // if restaurant name is null -> save it
      const result = await cloudinary.uploader.upload(req.file.path);
      await Restaurant.create({
        name: req.body.name,
        categoryUrl: req.body.categoryUrl,
        url: req.body.name,
        profile_img: result.secure_url,
        cloudinary_id: result.public_id,
      });
      req.flash("success", `Restaurant Created successfully!`);
      res.redirect("/admins"); // then change to /admins/restaurants
    }
  } catch (error) {
    res.render("error");
  }
}

// =========================================================================================
// =========================================================================================
async function foodsIndex(req, res) {
  try {
    const categories = await Category.find({});
    const restaurants = await Restaurant.find({});
    const foods = await Food.find({});
    res.render("admins/foods", {
      title: "Courses",
      restaurants: restaurants,
      categories: categories,
      foods: foods,
      errorMessages: req.flash("Error"),
      successMessages: req.flash("success"),
    });
  } catch (error) {
    res.render("error");
  }
}

// create new food
async function createFood(req, res) {
  try {
    const foodName = await Food.findOne({
      name: { $regex: new RegExp("^" + req.body.name.toLowerCase(), "i") },
    });
    //if food name already available
    if (foodName) {
      req.flash("Error", `Food Name Already Exist!`);
      res.redirect("/admins/foods");
    } else {
      // if food name is null -> save it
      const result = await cloudinary.uploader.upload(req.file.path);

      await Food.create({
        name: req.body.name,
        restaurantUrl: req.body.restaurantUrl,
        price: req.body.price,
        description: req.body.description,
        url: req.body.name,
        profile_img: result.secure_url,
        cloudinary_id: result.public_id,
      });
      req.flash("success", `Food Created successfully!`);
      res.redirect("/admins"); // then change to /admins/restaurants
    }
  } catch (error) {
    res.render("error");
  }
}

// =========================================================================================
// =========================================================================================

async function usersIndex(req, res) {
  try {
    const users = await User.find({});
    const categories = await Category.find({});
    const restaurants = await Restaurant.find({});
    const foods = await Food.find({});
    res.render("admins/users", {
      title: "Users",
      users: users,
      categories: categories,
      restaurants: restaurants,
      foods: foods,
      errorMessages: req.flash("Error"),
      successMessages: req.flash("success"),
    });
  } catch (error) {
    res.render("error");
  }
}

// create new user
async function createUser(req, res) {
  try {
    const userName = await User.findOne({
      name: { $regex: new RegExp("^" + req.body.name.toLowerCase(), "i") },
    });
    //if user name already available
    if (userName) {
      req.flash("Error", `User Name Already Exist!`);
      res.redirect("/admins/users");
    } else {
      // if user name is null -> save it
      await User.create({
        name: req.body.name,
        profile_img: req.body.profile_img,
        cloudinary_id: req.body.cloudinary_id,
        googleId: req.body.googleId,
        email: req.body.email,
        avatar: req.body.avatar,
        role: req.body.role,
      });
      req.flash("success", `User Created successfully!`);
      res.redirect("/admins"); // then change to /admins/users
    }
  } catch (error) {
    res.render("error");
  }
}

// =========================================================================================
// =========================================================================================

// =========================================================================================
// =========================================================================================
