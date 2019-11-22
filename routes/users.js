var express = require('express');
var router = express.Router();
var db = require("../db/mysql")
const jwt = require('jsonwebtoken');
var secretkey = 'icon';
/* GET users listing. */
router.post('/login', function (req, res, next) {
  let username = req.body.username
  let password = req.body.password
  let sql = `select * from users where username="${username}" and password="${password}"`
  db.query(sql, (results, fields) => {
    if (results.length != 1) {
      res.json({
        errno: -1,
        msg: "用户名或密码错误！"
      })
      return
    }
    let token = jwt.sign({
      username: username
    }, secretkey, {
      expiresIn: '2h'
    });
    res.json({
      errno: 0,
      msg: "登录成功",
      data: results,
      token: token
    })
  })

});


module.exports = router;