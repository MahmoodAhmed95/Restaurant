var express = require("express");
var router = express.Router();
// const upload = require("../utils/multer");

const restaurantsCtrl = require("../controllers/restaurants");
// const categoriesCtrl = require("../controllers/categories");

/* GET home page. */
router.get("/", restaurantsCtrl.index);

//Creating course Route
router.get("/:name", restaurantsCtrl.showOne);

module.exports = router;
