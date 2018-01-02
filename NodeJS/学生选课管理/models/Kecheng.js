/**
 */
var mongoose = require('mongoose');

//schema
var kechengSchema = new mongoose.Schema({
    "kid"  : Number,
    "name" : String,
    "students" : [String]       //这个数组存放的是学生的sid
});
//索引
kechengSchema.index({ "kid": 1});

kechengSchema.statics.tianjiaxuesheng = function (kidArr,sid) {
    //都是在异步执行
    for (var i = 0; i < kidArr.length; i++) {
        Kecheng.update({"kid": kidArr[i]},{$push: {"students":sid}},function () {

        })
    }
}
//model
var Kecheng = mongoose.model("Kecheng",kechengSchema);

module.exports = Kecheng;