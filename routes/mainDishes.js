var express = require("express");
var router = express.Router();
const mainDishesCtrl = require("../controllers/mainDishes");
router.get("/categories/mainDishes", mainDishesCtrl.mainDishes);
router.get("/mainDishes", function (req, res, next) {
  res.render("mainDishes", { title: "mainDishes" });
});

module.exports = router;