var express = require("express");
var router = express.Router();
const dessertsCtrl = require("../controllers/desserts");
router.get("/categories/desserts", dessertsCtrl.desserts);
router.get("/desserts", function (req, res, next) {
  res.render("desserts", { title: "desserts" });
});

module.exports = router;