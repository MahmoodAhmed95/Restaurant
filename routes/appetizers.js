var express = require("express");
var router = express.Router();
const appetizersCtrl = require("../controllers/appetizers");
router.get("/categories/appetizers", appetizersCtrl.appetizers);
router.get("/appetizers", function (req, res, next) {
  res.render("appetizers", { title: "appetizers" });
});

module.exports = router;