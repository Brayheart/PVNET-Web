var express = require('express');
var router = express.Router();
var mysql = require('mysql');

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
/* GET home page. */
// router.get('/', function(req, res, next) {
//     var db = req.con;
//     var data = "";
//
//     var user = "classUser";
//
//     var filter = "";
//     if (user) {
//         filter = 'WHERE userid = ?';
//     }
//
//     db.query("SELECT * FROM SummerClasses WHERE instructor='Doug';", user, function(err, rows) {
//         if (err) {
//             console.log(err);
//         }
//         var data = rows;
//
//         // use index.ejs
//         res.render('index',{page_title:"Test Table",data:rows});
//     });
//
// });
exports.list = function(req, res){

    req.getConnection(function(err,connection){
        var query = connection.query("SELECT * FROM SummerClasses WHERE instructor='Doug';",function(err,rows){
            if(err)
                console.log("Error Selecting : %s ",err );

            res.render('index',{page_title:"Test Table",data:rows});
        });
    });
};
module.exports = router;
