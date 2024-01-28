var express = require("express");
var router = express.Router();
const blogCtrl = require("../controllers/blogs");
router.get("/", blogCtrl.blog);
router.get("/blog", function (req, res, next) {
  res.render("blog", { title: "blog" });
});

module.exports = router;