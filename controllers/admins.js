const Category = require("../models/category");
const Restaurant = require("../models/restaurant");
const Food = require("../models/food");
const User = require("../models/user");
const cloudinary = require("../utils/cloudinary");

module.exports = {
  index,
  createUser,
  usersIndex,

  addCategoryForm,
  addRestaurantForm,
  addFoodForm,

  updateCategoryForm,
  updateRestaurantForm,
  updateFoodForm,

  deleteCategoryForm,
  deleteRestaurantForm,
  deleteFoodForm,

  addCategory,
  addRestaurant,
  addFood,

  updateCategory,
  updateRestaurant,
  updateFood,

  deleteCategory,
  deleteRestaurant,
  deleteFood,
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

// =================================================================
// ======================== add category ===========================
// =================================================================
// Start "Categories" Controls

async function addCategoryForm(req, res) {
  const category = await Category.find({});
  res.render("admins/addCategory", {
    title: "Add Category",
    category,
    errorMessages: req.flash("Error"),
    successMessages: req.flash("success"),
  });
}

async function addCategory(req, res) {
  try {
    const categoryName = await Category.findOne({
      name: { $regex: new RegExp("^" + req.body.name.toLowerCase(), "i") },
    });

    if (categoryName) {
      req.flash("error", "Category Name Already Exists!");
      res.redirect("/admins/addCategory");
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
// =================================================================
// ======================== Update category ========================
// =================================================================

async function updateCategoryForm(req, res) {
  const category = await Category.find({});
  // const categories = await Category.find({});
  const categoriesObject = category.reduce((acc, category) => {
    acc[category.name] = category;
    return acc;
  }, {});
  res.render("admins/updateCategory", {
    title: "Update Category",
    category,
    categories: categoriesObject,
    errorMessages: req.flash("Error"),
    successMessages: req.flash("success"),
  });
}

async function updateCategory(req, res) {
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

// =================================================================
// ======================== delete category ========================
// =================================================================

async function deleteCategoryForm(req, res) {
  const category = await Category.find({});
  res.render("admins/deleteCategory", {
    title: "Delete Category",
    category,
    errorMessages: req.flash("Error"),
    successMessages: req.flash("success"),
  });
}

async function deleteCategory(req, res) {
  try {
    await Category.deleteOne({ name: req.params.name });
    // req.flash("success", "Category Deleted successfully!");
    res.redirect("/admins/deleteCategory");
  } catch (error) {
    console.error(error);
    req.flash("error", "An error occurred during category deletion.");
    res.redirect("/admins");
  }
}

// =========================================================================================
// =========================================================================================

// =================================================================
// ======================== add restaurant =========================
// =================================================================

// Start "Restaurants" Controls

async function addRestaurantForm(req, res) {
  try {
    const categories = await Category.find({});
    const restaurants = await Restaurant.find({});
    const foods = await Food.find({});
    res.render("admins/addRestaurant", {
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
async function addRestaurant(req, res) {
  try {
    const restaurantName = await Restaurant.findOne({
      name: { $regex: new RegExp("^" + req.body.name.toLowerCase(), "i") },
    });
    //if restaurant name already available
    if (restaurantName) {
      req.flash("Error", `Restaurant Name Already Exist!`);
      res.redirect("/admins/addRestaurant");
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

// =================================================================
// ======================== update restaurant =========================
// =================================================================
async function updateRestaurantForm(req, res) {
  try {
    const categories = await Category.find({});
    const restaurants = await Restaurant.find({});
    const foods = await Food.find({});
    res.render("admins/updateRestaurant", {
      title: "update Restaurants",
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

async function updateRestaurant(req, res) {
  try {
    const restaurantName = await Restaurant.findOne({
      name: { $regex: new RegExp("^" + req.body.name.toLowerCase(), "i") },
    });
    //if restaurant name already available
    if (restaurantName) {
      req.flash("Error", `Restaurant Name Already Exist!`);
      res.redirect("/admins/updateRestaurant");
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
// =================================================================
// ======================== delete restaurant ======================
// =================================================================

async function deleteRestaurantForm(req, res) {
  const category = await Category.find({});
  const restaurant = await Restaurant.find({});
  res.render("admins/deleteRestaurant", {
    title: "Delete Restaurant",
    category,
    restaurant,
    errorMessages: req.flash("Error"),
    successMessages: req.flash("success"),
  });
}

async function deleteRestaurant(req, res) {
  try {
    await Restaurant.deleteOne({ name: req.params.name });
    res.redirect("/admins/deleteRestaurant");
  } catch (error) {
    console.error(error);
    req.flash("error", "An error occurred during Restaurant deletion.");
    res.redirect("/admins");
  }
}

// =========================================================================================
// =========================================================================================

// =================================================================
// ======================== add food ===============================
// =================================================================
async function addFoodForm(req, res) {
  try {
    const categories = await Category.find({});
    const restaurants = await Restaurant.find({});
    const foods = await Food.find({});
    res.render("admins/addFood", {
      title: "Add Food",
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
async function addFood(req, res) {
  try {
    const foodName = await Food.findOne({
      name: { $regex: new RegExp("^" + req.body.name.toLowerCase(), "i") },
    });
    //if food name already available
    if (foodName) {
      req.flash("Error", `Food Name Already Exist!`);
      res.redirect("/admins/addFood");
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

// =================================================================
// ======================== update food ============================
// =================================================================
async function updateFoodForm(req, res) {
  try {
    const categories = await Category.find({});
    const restaurants = await Restaurant.find({});
    const foods = await Food.find({});
    res.render("admins/updateFood", {
      title: "Update Food",
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

async function updateFood(req, res) {
  try {
    const foodName = await Food.findOne({
      name: { $regex: new RegExp("^" + req.body.name.toLowerCase(), "i") },
    });
    //if food name already available
    if (foodName) {
      req.flash("Error", `Food Name Already Exist!`);
      res.redirect("/admins/updateFood");
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

// =================================================================
// ======================== delete food ============================
// =================================================================

async function deleteFoodForm(req, res) {
  const food = await Food.find({});
  const restaurant = await Restaurant.find({});
  res.render("admins/deleteFood", {
    title: "Delete Food",
    restaurant,
    food,
    errorMessages: req.flash("Error"),
    successMessages: req.flash("success"),
  });
}

async function deleteFood(req, res) {
  try {
    await Food.deleteOne({ name: req.params.name });
    res.redirect("/admins/deleteFood");
  } catch (error) {
    console.error(error);
    req.flash("error", "An error occurred during Food deletion.");
    res.redirect("/admins");
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
