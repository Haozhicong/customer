var express = require('express');
var router = express.Router();
var db = require("../db/mysql")
// 获取客户列表
router.get('/customerlist', function (req, res, next) {
  let userid = req.query.userid;
  let limit = req.query.limit;
  let page = req.query.page;
  let star = limit * (page - 1)
  let end = limit
  // 定义SQL语句
  var count = 0;
  let sqlStr = `SELECT COUNT(*) FROM customerinfo where userid = ${userid}`
  let sqlStr1 = `SELECT * FROM customerinfo where userId=${userid}`
  // 'SELECT * FROM customerinfo WHERE userid = 1 AND companyName LIKE '%零%' order by createTime desc limit 10 OFFSET 0'
  if (req.query.companyName) {
    sqlStr += ` AND companyName like "%${req.query.companyName}%"`
    sqlStr1 += ` AND companyName like "%${req.query.companyName}%" order by createTime desc limit ${end} OFFSET ${star}`
  } else {
    sqlStr1 += ` order by createTime desc limit ${end} OFFSET ${star}`
  }
  // 查询总条数
  db.query(sqlStr, (results, fields) => {
    let allCount = results[0]['COUNT(*)']
    count = allCount
    // 分页查询
    db.query(sqlStr1, (results, fields) => {
      if (results.length === 0) {
        res.json({
          errno: -1,
          msg: '获取列表失败'
        })
        return
      }
      res.json({
        errno: 0,
        data: results,
        counts: count
      });
    })
  })

});
// 编辑客户
router.post('/customeredit', function (req, res, next) {
  const sql = `UPDATE customerinfo SET 
  companyName='${req.body.companyName}',
  contacts='${req.body.contacts}',
  contactPhone='${req.body.contactPhone}',
  fixedTelephone='${req.body.fixedTelephone}',
  wechat='${req.body.wechat}',
  remarks='${req.body.remarks}'  
  WHERE userid='${req.body.userid}' AND id='${req.body.id}'`
  db.query(sql, (results, fields) => {
    if (results.affectedRows != 1) {
      res.json({
        errno: -1,
        msg: '编辑客户失败'
      })
      return;
    }
    res.json({
      errno: 0,
      msg: '编辑客户成功',
    })
  })
});
// 删除客户
router.get('/customerdel', function (req, res, next) {
  let sql = `DELETE FROM customerinfo WHERE id = ${req.query.id} ANd userid = ${req.query.userid}`
  db.query(sql, (results, fields) => {
    if (results.affectedRows != 1) {
      res.json({
        errno: -1,
        msg: '删除客户失败'
      })
      return;
    }
    res.json({
      errno: 0,
      msg: '删除客户成功',
    })
  })
});
// 新增客户
router.post('/customeradd', function (req, res, next) {
  let sql = `INSERT INTO customerinfo (companyName,contacts,contactPhone,fixedTelephone,wechat,remarks,userid) VALUES ("${req.body.companyName}","${req.body.contacts}","${req.body.contactPhone}","${req.body.fixedTelephone}",${req.body.wechat},"${req.body.remarks}",${req.body.userid})`
  db.query(sql, (results, fields) => {
    if (results.affectedRows != 1) {
      res.json({
        errno: -1,
        msg: '添加客户失败'
      })
      return;
    }
    res.json({
      errno: 0,
      msg: '添加客户成功',
      insertId: results.insertId
    })
  })
});

module.exports = router;