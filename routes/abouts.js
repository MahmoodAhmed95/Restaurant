var express = require("express");
var router = express.Router();
const aboutsCtrl = require("../controllers/abouts");
router.get("/", aboutsCtrl.about);
router.get("/about", function (req, res, next) {
  res.render("about", { title: "About Us" });
});

module.exports = router;