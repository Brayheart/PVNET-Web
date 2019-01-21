var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
    var db = req.con;
    var data = "";

    var user = "classUser";

    var filter = "";
    if (user) {
        filter = 'WHERE userid = ?';
    }

    db.query("SELECT * FROM SummerClasses WHERE instructor='Doug';", user, function(err, rows) {
        if (err) {
            console.log(err);
        }
        var data = rows;

        // use index.ejs
        res.render('index',{page_title:"Test Table",data:rows});
    });

});

module.exports = router;
