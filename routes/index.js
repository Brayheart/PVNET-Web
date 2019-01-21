var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "classUser",
    password: "P00bapop!",
    database: "TestDatabase"
});

/* GET home page. */
router.get('/', function(req, res, next) {
    var db = req.con;
    var data = "";

    var user = "";
    var user = req.query.user;

    var filter = "";
    if (user) {
        filter = 'WHERE userid = ?';
    }

    req.getConnection(function(err,connection){
        var query = connection.query("SELECT * FROM SummerClasses WHERE instructor='Doug';",function(err,rows){
            if(err)
                console.log("Error Selecting : %s ",err );

            res.render('index',{page_title:"Test Table",data:rows});
        });
    });

});

module.exports = router;
