var express = require("express");
var router = express.Router();
const categoriesCtrl = require("../controllers/categories");
router.get("/", categoriesCtrl.categories);
router.get("/categories", function (req, res, next) {
  res.render("categories", { title: "categories" });
});

module.exports = router;