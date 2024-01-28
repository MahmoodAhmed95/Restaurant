var express = require("express");
var router = express.Router();

const categoriesCtrl = require("../controllers/categories");

/* GET home page. */
router.get("/", categoriesCtrl.index);

//New Category Route to display the form
router.get("/:name", categoriesCtrl.showCategoryRestaurents);

module.exports = router;
