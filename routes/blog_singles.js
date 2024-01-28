var express = require("express");
var router = express.Router();
const blog_singlesCtrl = require("../controllers/blog_singles");
router.get("/", blog_singlesCtrl.blog_single);
router.get("/blog_single", function (req, res, next) {
  res.render("blog_single", { title: "blog_single" });
});

module.exports = router;