/**
 * Created by Danny on 2015/9/22 9:22.
 */
var express = require("express");

var app = express();

app.use(express.static("./public"));

app.get("/haha",function(req,res){
    res.send("haha ");
});

app.listen(3000);