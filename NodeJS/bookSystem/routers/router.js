
var Book = require("../models/book.js")

exports.addBook = function (req,res,next) {

    res.render("addbook");
}

exports.doAdd = function (req,res,next) {
    console.log(req.query);

    Book.create(req.query,function (err) {
        if (err){
            res.send("失败");
            return;
        }
    })
    res.send("成功");
}

exports.showIndex = function (req,res,next) {

    Book.liechusuoyoushu(function (err,result) {

        if (err){
            res.send("失败");
            return;
        }
        res.render("index",{
            "tushu": result
        })

    })

}

exports.edit = function (req,res,next) {
    Book.findBookByName(req.query.id,function (err,result) {
        res.render("edit",result[0])
    })

}

exports.doEdit = function (req,res,next) {


}

