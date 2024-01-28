var express = require("express");
var router = express.Router();
const recipesCtrl = require("../controllers/recipes");
router.get("/", recipesCtrl.recipes);
router.get("/recipes", function (req, res, next) {
  res.render("recipes", { title: "recipes" });
});

module.exports = router;