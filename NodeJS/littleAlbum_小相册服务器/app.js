
var express = require("express")
var app = express()
var router = require("./contoller/router.js")

//导入模板引擎
app.set("view engine","ejs")

//路由中间件
app.use(express.static("./public"))
app.use(express.static("./uploads"))

app.get("/",router.showIndex)

app.get("/:albumName",router.showAlbum)

app.get("/up", router.showUp);

app.post("/up",router.doPost);

app.use(function (req,res) {

    res.render("err")
})

//运行服务器，监听3000端口（端口号可以任改）
app.listen(3000)