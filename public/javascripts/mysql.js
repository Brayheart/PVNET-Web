var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "classUser",
    password: "P00bapop!",
    database: "TestDatabase"
});

con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM TestClasses WHERE instructor='Doug';", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        write(result);
    });
});