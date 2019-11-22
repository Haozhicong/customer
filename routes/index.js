var express = require('express');
var router = express.Router();
var db = require("../db/mysql"); //引入数据库封装模块

/* GET home page. */
router.get('/', function (req, res, next) {
  //查询users表
  db.query("SELECT * FROM customerinfo", function (results, fields) {
    console.log(results);
    res.json({
      errno: 1,
      data: results
    });
  })

});

module.exports = router;