var mysql = require('mysql');
var express = require('express');
var app = express();

var con = mysql.createConnection({
    host: "localhost",
    user: "classUser",
    password: "P00bapop!",
    database: "TestDatabase"
});

con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM SummerClasses WHERE instructor='Doug';", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
});

app.get('/',  function(req, res){

    req.getConnection(function(err,connection){
        var query = connection.query("SELECT * FROM SummerClasses WHERE instructor='Doug';",function(err,rows){
            if(err)
                console.log("Error Selecting : %s ",err );

            res.render('index',{page_title:"Test Table",data:rows});
        });
    });
});
