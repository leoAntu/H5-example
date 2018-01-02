/**
 * Created by Danny on 2015/9/29 14:41.
 */
var express = require("express");
var app = express();
var router = require("./router/router.js");
var db = require("./models/db.js")

app.set("view engine","ejs");

app.get("/",router.showIndex);
app.get("/add",router.showAdd);
app.get("/doadd",router.showDoAdd);

app.get("/edit/:sid",router.showEdit);
app.get("/doedit/:sid",router.showDoEdit);
app.get("/remove/:sid",router.showRemove);


app.listen(3000);
