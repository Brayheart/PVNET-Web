var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {

    var db = req.con;
    var data = "";

    var user = "";
    var user = req.body.user;

    var filter = "";
    if (user) {
        filter = 'WHERE instructor = ?';
    }

    db.query('SELECT * FROM  SummerClasses ' + filter, user, function(err, rows) {
        if (err) {
            console.log(err);
        }
        var data = rows;

        // use index.ejs
        res.render('index', { title: 'Test Table', data: data, user: user });
    });

});


// add post
router.post('/userAdd', function(req, res, next) {

    var db = req.con;

    // check userid exist
    var userid = req.body.userid;
    var qur = db.query('SELECT * FROM SummerClasses WHERE instructor = ?', userid, function(err, rows) {
        if (err) {
            console.log(err);
        }

        var count = rows.length;
        if (count > 0) {

            var msg = 'Userid already exists.';
            res.render('userAdd', { title: 'Add User', msg: msg });

        } else {

            var sql = {
                Class_ID: req.body.Class_ID,
                Class_Name: req.body.Class_Name,
                Department: req.body.Department,
                Class_Number: req.body.Class_Number,
                Class_Section: req.body.Class_Section,
                Activate: req.body.Activate,
                Instructor: req.body.Instructor,
                Internal_Notes: req.body.Internal_Notes,
                Class_Description: req.body.Class_Description,
                Additional_Info: req.body.Additional_Info,
                Prerequisite: req.body.Prerequisite,
                Start_Week: req.body.Start_Week,
                End_Week: req.body.End_Week,
                Age_Start: req.body.Age_Start,
                Age_End: req.body.Age_End,
                Consummables_Fee: req.body.Consummables_Fee,
                Hourly_Fee: req.body.Hourly_Fee,
                Registration_Fee: req.body.Registration_Fee
            };

            //console.log(sql);
            var qur = db.query('INSERT INTO account SET ?', sql, function(err, rows) {
                if (err) {
                    console.log(err);
                }
                res.setHeader('Content-Type', 'application/json');
                res.redirect('/');
            });
        }
    });


});


 module.exports = router;
// <!DOCTYPE html>
//
// <html>
// <head>
// <script>
// function Search() {
//     var userid = document.getElementsByName('instructor')[0].value;
//     window.location.href = "/?user=" + userid;;
// }
// </script>
// </head>
// <body>
// <h1>Classes - List</h1>
//
// <table border="1" cellpadding="7" cellspacing="7">
//     <tr>
//     <th width="50px">No</th>
//     <th>Class_ID</th>
//     <th>Class_Name</th>
//     <th>Department</th>
//     <th>Class_Number</th>
//     <th>Class_Section</th>
//     <th>Activate</th>
//     <th>Instructor</th>
//     <th>Internal_Notes</th>
//     <th>Class_Description</th>
//     <th>Additional_Info</th>
//     <th>Prerequisite</th>
//     <th>Start_Week</th>
//     <th>End_Week</th>
//     <th>Age_Start</th>
//     <th>Age_End</th>
//     <th>Consummables_Fee</th>
//     <th>Hourly_Fee</th>
//     <th>Registration_Fee</th>
//
//     </tr>
//     <% if(data.length){
//     for(var i = 0;i < data.length;i++) { %>
//     <tr>
//         <td><%=(i+1)%></td>
//         <td><%=data[i].Class_ID%></td>
//         <td><%=data[i].Class_Name%></td>
//         <td><%=data[i].Department%></td>
//         <td><%=data[i].Class_Number%></td>
//         <td><%=data[i].Class_Section%></td>
//         <td><%=data[i].Activate%></td>
//         <td><%=data[i].Instructor%></td>
//         <td><%=data[i].Internal_Notes%></td>
//         <td><%=data[i].Class_Description%></td>
//         <td><%=data[i].Additional_Info%></td>
//         <td><%=data[i].Prerequisite%></td>
//         <td><%=data[i].Start_Week%></td>
//         <td><%=data[i].End_Week%></td>
//         <td><%=data[i].Age_Start%></td>
//         <td><%=data[i].Age_End%></td>
//         <td><%=data[i].Consummables_Fee%></td>
//         <td><%=data[i].Hourly_Fee%></td>
//         <td><%=data[i].Registration_Fee%></td>
//             </tr>
//             <% }
// }else{ %>
// <tr>
//     <td colspan="3">No user</td>
//     </tr>
//     <% } %>
// </table>
// </body>
// </html>
