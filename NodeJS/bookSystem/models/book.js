var mongoose = require('mongoose');
var db = require("./db.js");
//创建了一个schema结构。
var bookSchema = new mongoose.Schema({
    name     :  {type : String},
    author      :  {type : String},
    price      :  {type : Number}
});

//添加静态方法
bookSchema.statics.liechusuoyoushu = function (callback) {

    this.model("Book").find({},callback)
}
//根据_id查找图书
bookSchema.statics.findBookByName = function (name,callback) {

    this.model("Book").find({"name":name},callback)
}

bookSchema.statics.updateByName = function (name,callback) {

}

//创建了一个模型，
//类是基于schema创建的。
var bookModel = db.model('Book', bookSchema);

module.exports = bookModel;