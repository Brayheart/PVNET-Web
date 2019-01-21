var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
    var db = req.con;
    var data = "";
    var user = "";
    var user = req.query.user;
    var filter = "";

    if (user) {
        filter = 'WHERE instructor = ?';
    }

    db.query("SELECT * FROM SummerClasses "+ filter,user,";",function(err, rows) {
        if (err) {
            console.log(err);
        }

        // use index.ejs
        res.render('index',{page_title:"Test Table",data:rows, user: user});
    });

});

module.exports = router;
// <h1>Classes - List</h1>
// <div class="search">
//     <label>instructor：</label>
// <input type="text" name="suserid" value="<%=user  %>" placeholder="input instructor name">
//     <input type="button" name="sSearch" value="Search" class="btn" onclick="Search();">
//     </div>