var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("community", { title: "커뮤니티", active: "community" });
});
module.exports = router;
