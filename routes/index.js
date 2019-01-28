var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next){
    res.render('index', {title:'login'});
});

router.param('First', function(req, res, next, First){
    var key = 'pvnet';
    if(key==First){
        next();
    }else{
        alert('error');
    }
});

router.get('/ClassesDisplay', function(req, res, next) {

    var db = req.con;
    var data = "";

    var user = req.body.Instructor;

    var filter = "";
    if (user) {
        filter = 'WHERE instructor = ?';
    }
    console.log(user);
    db.query('SELECT * FROM  SummerClasses ' + filter, user, function(err, rows) {
        if (err) {
            console.log(err);
        }
        var data = rows;
        console.log(user);
        // use index.ejs
        res.render('ClassesDisplay', { title: 'Test Table', data: data, user: user });

    });

});

router.param('Instructor', function(req, res,next,Instructor){
     var db = req.con;
    db.query("SELECT * FROM  SummerClasses WHERE Instructor = ?", Instructor, function(err, rows) {
        if(err) {
            console.log(err);
            res.redirect('/SearchIns');
        }else{
            next();
        }
    });

    });
router.get('/InstructorSearch', function(req, res, next) {

    var db = req.con;
    var data = "";

    var user = req.param('Instructor');
    console.log(user);


    db.query("SELECT * FROM  SummerClasses WHERE Instructor = ?", user, function(err, rows) {
        if (err) {
            console.log(err);
        }
        var data = rows;
        // use index.ejs
        res.render('SearchIns', { title: 'Test Table', data: data, user: user });

    });
});

router.get('/add', function(req, res, next) {

    // use userAdd.ejs
    res.render('userAdd', { title: 'Add Classes', msg: '' });
});

// add post
router.post('/userAdd', function(req, res, next) {

    var db = req.con;

    // check userid exist
    var userid = req.body.Class_ID;

    var qur = db.query('SELECT * FROM SummerClasses WHERE Class_ID = ?', userid, function(err, rows) {
        if (err) {
            console.log(err);
        }

        var count = rows.length;
        if (count > 0) {

            var msg = 'Class already exists.';
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
                Registration_Fee: req.body.Registration_Fee,
                Price_Included_For_Interns: req.body.Price_Included_For_Interns,
                Intern_Only: req.body.Intern_Only,
                Field_Trip: req.body.Field_Trip,
                Field_Trip_Wish_List: req.body.Field_Trip_Wish_List,
                Class: req.body.Class,
                Workshop: req.body.Workshop,
                GroupBased: req.body.GroupBased,
                Seasonal_Classification: req.body.Seasonal_Classification,
                No_Weeks: req.body.No_Weeks,
                M: req.body.M,
                T: req.body.T,
                W: req.body.W,
                TH: req.body.TH,
                F: req.body.F,
                Sat: req.body.Sat,
                Sun: req.body.Sun,
                Hrs_Per_Class: req.body.Hrs_Per_Class,
                Mtgs_Per_Wk: req.body.Mtgs_Per_Wk,
                Total_Meetings: req.body.Total_Meetings,
                Total_Class_Time_Hrs: req.body.Total_Class_Time_Hrs,
                Start_Time: req.body.Start_Time,
                End_Time: req.body.End_Time,
                AREA: req.body.AREA,
                IMG_1: req.body.IMG_1,
                IMG_2: req.body.IMG_2,
                IMG_3: req.body.IMG_3,
                EXT_LINK_1: req.body.EXT_LINK_1,
                EXT_LINK_2: req.body.EXT_LINK_2,
                EXT_LINK_3: req.body.EXT_LINK_3,
                UND_1: req.body.UND_1,
                UND_2: req.body.UND_2,
                UND_3: req.body.UND_3,
                UND_4: req.body.UND_4,
                UND_5: req.body.UND_5,
                UND_6: req.body.UND_6,
                UND_7: req.body.UND_7,
                UND_8: req.body.UND_8,
                UND_9: req.body.UND_9,
                UND_10: req.body.UND_10
            };

            console.log(sql);
            var qur = db.query('INSERT INTO SummerClasses SET ?', sql, function(err, rows) {
                if (err) {
                    console.log(err);
                }
                res.setHeader('Content-Type', 'application/json');
                res.redirect('/');
            });
        }
    });


});


// edit page
router.get('/userEdit', function(req, res, next) {

    var id = req.query.Class_ID;
    console.log(id);

    var db = req.con;
    var data = "";

    db.query('SELECT * FROM SummerClasses WHERE Class_ID = ?', id, function(err, rows) {
        if (err) {
            console.log(err);
        }

        var data = rows;
        res.render('userEdit', { title: 'Edit Class', data: data });
    });

});


router.post('/userEdit', function(req, res, next) {

    var db = req.con;

    var id = req.body.Class_ID;

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
        Registration_Fee: req.body.Registration_Fee,
        Price_Included_For_Interns: req.body.Price_Included_For_Interns,
        Intern_Only: req.body.Intern_Only,
        Field_Trip: req.body.Field_Trip,
        Field_Trip_Wish_List: req.body.Field_Trip_Wish_List,
        Class: req.body.Class,
        Workshop: req.body.Workshop,
        GroupBased: req.body.GroupBased,
        Seasonal_Classification: req.body.Seasonal_Classification,
        No_Weeks: req.body.No_Weeks,
        M: req.body.M,
        T: req.body.T,
        W: req.body.W,
        TH: req.body.TH,
        F: req.body.F,
        Sat: req.body.Sat,
        Sun: req.body.Sun,
        Hrs_Per_Class: req.body.Hrs_Per_Class,
        Mtgs_Per_Wk: req.body.Mtgs_Per_Wk,
        Total_Meetings: req.body.Total_Meetings,
        Total_Class_Time_Hrs: req.body.Total_Class_Time_Hrs,
        Start_Time: req.body.Start_Time,
        End_Time: req.body.End_Time,
        AREA: req.body.AREA,
        IMG_1: req.body.IMG_1,
        IMG_2: req.body.IMG_2,
        IMG_3: req.body.IMG_3,
        EXT_LINK_1: req.body.EXT_LINK_1,
        EXT_LINK_2: req.body.EXT_LINK_2,
        EXT_LINK_3: req.body.EXT_LINK_3,
        UND_1: req.body.UND_1,
        UND_2: req.body.UND_2,
        UND_3: req.body.UND_3,
        UND_4: req.body.UND_4,
        UND_5: req.body.UND_5,
        UND_6: req.body.UND_6,
        UND_7: req.body.UND_7,
        UND_8: req.body.UND_8,
        UND_9: req.body.UND_9,
        UND_10: req.body.UND_10
    };

    var qur = db.query('UPDATE SummerClasses SET ? WHERE Class_ID = ?', [sql, id], function(err, rows) {
        if (err) {
            console.log(err);
        }

        res.setHeader('Content-Type', 'application/json');
        res.redirect('/');
    });

});


router.get('/userDelete', function(req, res, next) {

    var id = req.query.Class_ID;

    var db = req.con;

    var qur = db.query('DELETE FROM SummerClasses WHERE Class_ID = ?', id, function(err, rows) {
        if (err) {
            console.log(err);
        }
        res.redirect('/');
    });
});


 module.exports = router;
