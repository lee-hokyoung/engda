var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("tutors", { title: "잉다 튜터", active: "tutors" });
});
module.exports = router;
