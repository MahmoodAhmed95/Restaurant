var express = require("express");
var router = express.Router();
const upload = require("../utils/multer");

const adminsCtrl = require("../controllers/admins");

// =========================================================================================
// =========================================================================================

// Start "Dashboard" Routes

// Get "Dashboard" Page
router.get("/", adminsCtrl.index);

// End "Dashboard" Routes

// =========================================================================================
// =========================================================================================

// Start "Categories" Routes

// Get "addCategory" Routes
router.get("/addCategory", adminsCtrl.addCategoryForm);

// Post "addCategory" Routes
router.post(
  "/categories",
  upload.single("profile_img"),
  adminsCtrl.addCategory
);

// Get "updateCategory" Routes
router.get("/updateCategory", adminsCtrl.updateCategoryForm);

// Post "updateCategory" Routes
router.post(
  "/categories",
  upload.single("profile_img"),
  adminsCtrl.updateCategory
);

// Get "deleteCategory" Routes
router.get("/deleteCategory", adminsCtrl.deleteCategoryForm);

// Post "deleteCategory" Routes
router.delete("/deleteCategory/:name", adminsCtrl.deleteCategory);

// End "Categories" Routes

// =========================================================================================
// =========================================================================================

// Start "Restaurants" Routes

// Get "addRestaurant" Routes
router.get("/addRestaurant", adminsCtrl.addRestaurantForm);

// Post "addRestaurant" Routes
router.post(
  "/addRestaurant",
  upload.single("profile_img"),
  adminsCtrl.addRestaurant
);

// Get "updateRestaurant" Routes
router.get("/updateRestaurant", adminsCtrl.updateRestaurantForm);

// Post "updateRestaurant" Routes
router.post(
  "/restaurants",
  upload.single("profile_img"),
  adminsCtrl.updateRestaurant
);

// Get "deleteRestaurant" Routes
router.get("/deleteRestaurant", adminsCtrl.deleteRestaurantForm);

// Post "deleteRestaurant" Routes
router.delete("/deleteRestaurant/:name", adminsCtrl.deleteRestaurant);

// End "Restaurants" Routes

// =========================================================================================
// =========================================================================================
// Start "Foods" Routes

// Get "addFood" Routes
router.get("/addFood", adminsCtrl.addFoodForm);

// Post "addFood" Routes
router.post("/foods", upload.single("profile_img"), adminsCtrl.addFood);

// Get "updateFood" Routes
router.get("/updateFood", adminsCtrl.updateFoodForm);

// Post "updateFood" Routes
router.post("/foods", upload.single("profile_img"), adminsCtrl.updateFood);

// Get "deleteFood" Routes
router.get("/deleteFood", adminsCtrl.deleteFoodForm);

// Post "deleteFood" Routes
router.delete("/deleteFood/:name", adminsCtrl.deleteFood);

// End "Foods" Routes

// =========================================================================================
// =========================================================================================
// Start "Users" Routes

// Get "Users" Routes
router.get("/users", adminsCtrl.usersIndex);

// Post "Users" Routes
router.post("/users", adminsCtrl.createUser);

// End "Users" Routes

// =========================================================================================
// =========================================================================================

module.exports = router;
