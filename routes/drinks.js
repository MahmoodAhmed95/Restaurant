var express = require("express");
var router = express.Router();
const drinksCtrl = require("../controllers/drinks");
router.get("/categories/drinks", drinksCtrl.drinks);
router.get("/drinks", function (req, res, next) {
  res.render("drinks", { title: "drinks" });
});

module.exports = router;