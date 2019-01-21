var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
    var db = req.con;
    var data = "";

    var instructor = "";
    var user = ""
    var user = req.query.user;


    if (user) {
        filter = 'WHERE instructor = ?';
    }

    db.query("SELECT * FROM SummerClasses ",filter, user,function(err, rows) {
        if (err) {
            console.log(err);
        }

        // use index.ejs
        res.render('index',{page_title:"Test Table",data:rows});
    });

});

module.exports = router;
