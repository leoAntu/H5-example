

var db = require("../models/db.js")
var formidable = require('formidable')

var path = require("path");
var fs = require("fs");
var gm = require("gm");


exports.showIndex = function (req,res,next) {

    //检索数据库，查找头像

    if(req.session.login == "lee") {
        //如果登陆了
        var username = req.session.username;
        var login = true;
    } else {
        //没有登陆
        var username = "";  //制定一个空用户名
        var login = false;
    }

    db.find("user",{"username":username},function (err, result) {
        var avatar = "moren.jpg";

        if (err) {
            res.send("-1")
            return
        }

        if (result.length > 0) {
            avatar = result[0].avatar || "moren.jpg"
        }


        res.render("index",{
            login: req.session.login == "lee" ? true : false,
            username: req.session.login == "lee" ? req.session.username : "",
            active: "index",
            avatar: avatar
        })
    })
}

exports.showRegist = function (req,res,next) {

    res.render("regist",{
        login: req.session.login == "lee" ? true : false,
        username: req.session.login == "lee" ? req.session.username : "",
        active: "regist"
    })

}

exports.showLogin = function (req,res,next) {

    res.render("login",{
        login: req.session.login == "lee" ? true : false,
        username: req.session.login == "lee" ? req.session.username : "",
        active: "login"
    })
}

exports.doRegist = function (req,res,next) {

    //解析参数
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {

        var username = fields.username;
        var password = fields.password


        //查找用户名是否注册
        db.find("user",{"username":username},function (err, result) {

            if (err) {
                res.send("-3");
                return
            }

            // 如果存在用户，就返回-1
            if (result.length > 0) {
                res.send("-1");
                return
            }

            //  不存在用户，写入数据库
            db.insertOne("user",{"username":username,
                "password":password,
                "avatar":"moren.jpg"
                },
                function (mongoError) {
                if (err){
                    res.send("-3");
                    return
                }

                //存session
                req.session.login = "lee";
                req.session.username = username;

                res.send("1");
                return

            })
        })

    });
}

exports.doLogin = function (req,res,next) {

    //解析参数
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {

        var username = fields.username;
        var password = fields.password


        //查找用户名是否注册
        db.find("user",{"username":username},function (err, result) {

            if (err) {
                res.send("-3");
                return
            }

            //    如果不存在用户，就返回-1
            if (result.length == 0) {
                res.send("-1");
                return
            }

            // 验证密码
            var obj = result[0];
            if (password != obj.password) {
                res.send("-2");
                return
            }

            //存session
            req.session.login = "lee";
            req.session.username = username;

            res.send("1");
            return
        })

    });
}


//设置头像页面，必须保证此时是登陆状态
exports.showSetavatar = function (req, res, next) {
    //必须保证登陆
    if (req.session.login != "lee") {
        res.end("非法闯入，这个页面要求登陆！");
        return;
    }
    res.render("setavatar", {
        "login": true,
        "username": req.session.username || "小花花",
        "active": "setavatar"
    });
};

//设置头像
exports.dosetavatar = function (req, res, next) {
    //必须保证登陆
    if (req.session.login != "lee") {
        res.end("非法闯入，这个页面要求登陆！");
        return;
    }

    var form = new formidable.IncomingForm();
    form.uploadDir = path.normalize(__dirname + "/../avatar");
    form.parse(req, function (err, fields, files) {
        console.log(files);
        var oldpath = files.touxiang.path;
        var newpath = path.normalize(__dirname + "/../avatar") + "/" + req.session.username + ".jpg";
        fs.rename(oldpath, newpath, function (err) {
            if (err) {
                res.send("失败");
                return;
            }
            req.session.avatar = req.session.username + ".jpg";
            //跳转到切的业务
            res.redirect("/cut");
        });
    });
}

//显示切图页面
exports.showcut = function (req, res) {
    //必须保证登陆
    if (req.session.login != "lee") {
        res.end("非法闯入，这个页面要求登陆！");
        return;
    }
    res.render("cut", {
        avatar: req.session.avatar
    })
};


//执行切图
exports.docut = function (req, res, next) {
    //必须保证登陆
    if (req.session.login != "lee") {
        res.end("非法闯入，这个页面要求登陆！");
        return;
    }
    //这个页面接收几个GET请求参数
    //w、h、x、y
    var filename = req.session.avatar;
    var w = req.query.w;
    var h = req.query.h;
    var x = req.query.x;
    var y = req.query.y;

    gm("./avatar/" + filename)
        .crop(w, h, x, y)
        .resize(100, 100, "!")
        .write("./avatar/" + filename, function (err) {
            if (err) {
                res.send("-1");
                return;
            }

            console.log(req.session.avatar);

            //更改数据库当前用户的avatar这个值
            db.updateMany("user", {"username": req.session.username}, {
                $set: {"avatar": req.session.avatar}
            }, function (err, results) {
                res.send("1");
            });
        });
}


exports.doPost = function (req,res, next) {
    //必须保证登陆
    if (req.session.login != "lee") {
        res.end("非法闯入，这个页面要求登陆！");
        return;
    }
    //解析参数
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {

        var content = fields.content;
        var username = req.session.username;

        //  不存在用户，写入数据库
        db.insertOne("post",{
                "username":username,
                "data":new Date(),
                "content": content
            },
            function (mongoError) {
                if (err){
                    res.send("-3");
                    return
                }
                res.send("1");
                return

            })

    });
}

exports.getAllShuoshuo = function (req,res,next) {
    //这个页面接收一个参数，页面
    var page = req.query.page;
    db.find("post",{},{"pageamount":20,"page":page,"sort":{"data":-1}},function(err,result){
        res.json(result);
    });

}

//列出某个用户的信息
exports.getuserinfo = function(req,res,next){
    //这个页面接收一个参数，页面
    var username = req.query.username;
    db.find("user",{"username":username},function(err,result){
        if(err || result.length == 0){
            res.json("");
            return;
        }
        var obj = {
            "username" : result[0].username,
            "avatar" : result[0].avatar,
            "_id" : result[0]._id,
        };
        res.json(obj);
    });
};

//说说总数
exports.getshuoshuoamount = function(req,res,next){
    db.getAllCount("post",function(count){
        res.send(count.toString());
    });
};

//显示某一个用户的个人主页
exports.showUser = function(req,res,next){
    var user = req.params["user"];
    db.find("post",{"username":user},function(err,result){
        db.find("user",{"username":user},function(err,result2){
            res.render("user",{
                "login": req.session.login == "lee" ? true : false,
                "username": req.session.login == "lee" ? req.session.username : "",
                "user" : user,
                "active" : "user",
                "cirenshuoshuo" : result,
                "cirentouxiang" : result2[0].avatar
            });
        });
    });

}

//显示所有注册用户
exports.showuserlist = function(req,res,next){
    db.find("user",{},function(err,result){
        res.render("userlist",{
            "login": req.session.login == "lee" ? true : false,
            "username": req.session.login == "lee" ? req.session.username : "",
            "active" : "userlist",
            "suoyouchengyuan" : result
        });
    });
}