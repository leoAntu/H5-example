
var file = require("../models/file.js")
var formidable = require('formidable')
var path = require("path")
var fs = require("fs")
var sd = require("silly-datetime")

exports.showIndex = function (req,res,next) {
    //模板引擎渲染
    //node 的编程思想，就是所有东西都是异步的， 都是通过callback回调给上一层函数
    file.getAllAlbums(function (err,allAlbums) {
        if (err) {
            next();
            return;
        }
        res.render("index",{
            'albums': allAlbums
        })
    })

}

exports.showAlbum = function (req,res,next) {

    var albumName = req.params.albumName;

    file.getAllImagesByAlbumName(albumName,function (err,images) {

        if(err){
            next();
            return;
        }
        res.render("album",{
            'images': images,
            'albumName': albumName
        })
    })
}

exports.showUp = function (req,res,next) {
    //命令file模块（我们自己写的函数）调用getAllAlbums函数
    //得到所有文件夹名字之后做的事情，写在回调函数里面
    file.getAllAlbums(function(err,albums){
        res.render("up",{
            albums : albums
        });
    });

}

exports.doPost = function (req,res,next) {

    var form = new formidable.IncomingForm();
    //先放到临时目录，再移到uploads
    form.uploadDir = "./tempup";
    form.parse(req, function(err, fields, files) {
        if (err) {
            next()
            return
        }
        console.log(fields);
        console.log(files);
        console.log(__dirname);

        var size = parseFloat(files.tupian.size)
        if (size > 1024 * 1024 * 2) {
            res.send("图片大于2M")
            fs.unlink(files.tupian.path);
            return
        }

        var ttt = sd.format(new Date(), 'YYYYMMDDHHmmss');
        var ran = parseInt(Math.random() * 89999 + 10000);
        var extname = path.extname(files.tupian.name);  //后缀名

        var wenjianjia = fields.wenjianjia

        var oldpath = files.tupian.path;

        //必须要加绝对路径，并且绝对路径为当前js文件路径
        var newpath = __dirname + '/../uploads/' + wenjianjia + "/" + ttt + ran + extname

        fs.rename(oldpath,newpath,function (err2) {
            if (err2){
                console.log(err2);
                res.send("改名失败");
                return
            }
            res.send("成功")
        })

    });

}