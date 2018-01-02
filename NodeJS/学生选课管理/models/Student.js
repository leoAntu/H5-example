/**
 * Created by Danny on 2015/9/29 14:50.
 */
var mongoose = require('mongoose');

var studentSchema = mongoose.Schema({
    name: String,
    age: String,
    sex: String,
    sid: {type: String , index: true},  //index 索引
    kecheng: [String]
})


//设置索引
studentSchema.index({"sid": 1})

var Student = mongoose.model("Student",studentSchema);

module.exports = Student;