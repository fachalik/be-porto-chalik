/** @format */

var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  var absolute_path = __dirname;
  res.json({ status: 200, data: absolute_path }).status(200);
  // res.render('index', { title: 'Express' });
});

module.exports = router;
