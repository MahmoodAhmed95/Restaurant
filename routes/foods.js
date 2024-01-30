var express = require("express");
var router = express.Router();
// const upload = require("../utils/multer");

const foodsCtrl = require("../controllers/foods");
// const categoriesCtrl = require("../controllers/categories");

/* GET home page. */
router.get("/", foodsCtrl.index);

//Creating course Route
router.get("/:name", foodsCtrl.showOne);

module.exports = router;
