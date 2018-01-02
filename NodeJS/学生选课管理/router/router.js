
var Student = require("../models/Student.js")

var KeCheng = require("../models/Kecheng.js")
//
// KeCheng.create({
//     "kid": "100",
//     "name": "美术课"
// })
//
// KeCheng.create({
//     "kid": "101",
//     "name": "音乐课"
// })
//
// KeCheng.create({
//     "kid": "102",
//     "name": "英语课"
// })

exports.showIndex = function (req,res,next) {

    Student.find({},function (err, result) {

        res.render("index",{
            students: result
        })
    })
}

exports.showAdd = function (req,res,next) {

    KeCheng.find({},function (err,result) {
        if(err){
            res.send("失败")
            return;
        }
        res.render("add",{
            "quanbukecheng": result
        })
    })
}

exports.showDoAdd = function (req,res,next) {

    Student.create(req.query,function () {
        console.log("插入成功");
        var kecheng = [];
        kecheng.push(req.query.kecheng)
        KeCheng.tianjiaxuesheng(kecheng,req.query.sid);
        res.send("成功")
    })
}

exports.showEdit = function (req,res,next) {

    var sid = req.params["sid"];
    Student.findOne({"sid": sid},function (err,result) {
        if (err) {
            res.send("失败");
            return;
        }

        if (!result) {
            res.send("没查到此学生");
            return;
        }

        // quanbukecheng
        KeCheng.find({},function (err,result2) {
            if(err){
                res.send("失败")
                return;
            }
            res.render("edit",{
                "quanbukecheng": result2,
                "student": result
            })
        })
    })
    
}

exports.showDoEdit = function (req,res,next) {

    var sid = req.params["sid"];

    console.log(req.query);

    Student.update({"sid": sid},req.query,function (err) {
        if (err) {
            res.send("失败")
            return
        }

        res.send("成功");
    })
}

exports.showRemove = function (req,res,next) {
    var sid = req.params["sid"];

    Student.remove({"sid":sid},function (err) {
        if(err) {
            res.send("失败")
            return
        }
        res.send("成功");
    })
}