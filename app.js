var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var customerRouter = require('./routes/customer');
var app = express();
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
var secretkey = 'icon';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//设置跨域访问
app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

//处理post字段请求
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(function (req, res, next) {
  if (req.url != '/api/users/login') {
    //token可能存在post请求和get请求
    let token = req.body.token || req.query.token || req.headers.token;
    jwt.verify(token, secretkey, function (err, decode) {
      if (err) {
        res.json({
          msg: 'token过期，请重新登录',
          resultCode: '403'
        })
      } else {
        next();
      }
    })
  } else {
    next();
  }
})


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/customer', customerRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;