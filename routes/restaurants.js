var express = require("express");
var router = express.Router();

const restaurantsCtrl = require("../controllers/restaurants");

/* GET home page. */
router.get("/", restaurantsCtrl.index);

//New Category Route to display the form
router.get("/:name", restaurantsCtrl.showRestaurentFoods);

module.exports = router;
