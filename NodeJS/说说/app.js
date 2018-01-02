var express = require("express")
var router = require("./controllers/router.js")
var session = require('express-session')

var app = express()

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))


//模板引擎
app.set("view engine","ejs")
//设置静态页面导航
app.use(express.static("./public"))
app.use("/avatar",express.static("./avatar"))



//路由表
//首页
app.get("/",router.showIndex)
//注册界面
app.get("/regist",router.showRegist)
app.get("/login",router.showLogin)
app.get("/setavatar",router.showSetavatar); //设置头像页面
app.get("/cut",router.showcut);             //剪裁头像页面
app.get("/docut",router.docut);             //执行剪裁
app.get("/getAllShuoshuo",router.getAllShuoshuo);  //列出所有说说Ajax服务
app.get("/getuserinfo",router.getuserinfo);  //列出所有说说Ajax服务
app.get("/getshuoshuoamount",router.getshuoshuoamount);  //说说总数
app.get("/user/:user",router.showUser);  //显示用户所有说说
app.get("/userlist",router.showuserlist);  //显示所有用户列表

//注册提交信息
app.post("/doregist",router.doRegist)
app.post("/dologin",router.doLogin)
app.post("/dosetavatar",router.dosetavatar);//执行设置头像，Ajax服务
app.post("/post",router.doPost);//发布说说


app.listen(3000);