var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
    var db = req.con;
    var data = "";

    var user = "classUser";
    var user = req.query.user;

    var filter = "";


    req.query("SELECT * FROM SummerClasses WHERE instructor='Doug';", function(err, rows) {
        if (err) {
            console.log(err);
        }

        // use index.ejs
        res.render('index',{page_title:"Test Table",data:rows});
    });

});

module.exports = router;
