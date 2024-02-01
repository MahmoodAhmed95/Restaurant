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

// Get "Categories" Routes
router.get("/categories", adminsCtrl.categoryIndex);

// Post "Categories" Routes
router.post(
  "/categories",
  upload.single("profile_img"),
  adminsCtrl.createCategory
);

// End "Categories" Routes

// =========================================================================================
// =========================================================================================

// Start "Restaurants" Routes

// Get "Restaurants" Routes
router.get("/restaurants", adminsCtrl.restaurantsIndex);

// Post "Restaurants" Routes
router.post(
  "/restaurants",
  upload.single("profile_img"),
  adminsCtrl.createRestaurant
);

// End "Restaurants" Routes

// =========================================================================================
// =========================================================================================
// Start "Foods" Routes

// Get "Foods" Routes
router.get("/foods", adminsCtrl.foodsIndex);

// Post "Foods" Routes
router.post("/foods", upload.single("profile_img"), adminsCtrl.createFood);

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
