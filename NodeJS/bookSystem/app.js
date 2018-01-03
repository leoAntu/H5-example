var express = require("express")
var app = express();
var router = require("./routers/router.js")

app.set("view engine","ejs");

//路由中间件
app.use(express.static("./dist"))

app.get("/",router.showIndex);

app.get("/addbook",router.addBook);
app.get("/doadd",router.doAdd);
app.get("/edit",router.edit);
app.get("/doedit",router.doEdit);
app.get("/vue",router.showVue);


app.listen(3000)
