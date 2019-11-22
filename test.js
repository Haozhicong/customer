var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'customer'
});

connection.connect();

connection.query('SELECT * from users', function (err, data, fields) {
    if (err) {
        console.log(err);
        return;
    };
    console.log(data);
});

connection.end();