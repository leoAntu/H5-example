
var fs = require("fs")

/*
    callBack 返回 err，[files]
 */
exports.getAllAlbums = function (callBack) {

    fs.readdir("./uploads",function (err, files) {
        if (err) {
            callBack(err,null);
            return;
        }

        var filesArr = [];

        (function iterator(i) {
            if (i == files.length) {

                callBack(null, filesArr);
                return;
            }
            fs.stat("./uploads/" + files[i], function (err2, stats) {
                if (err2){
                    callBack(err2,null)
                    return
                }

                if (stats.isDirectory()){
                    filesArr.push(files[i])
                }
                iterator(i + 1)
            })

        })(0);
    })
}

/*
    通过文件名获取里面所有的图片

 */
exports.getAllImagesByAlbumName = function (albumName,callBack) {

    fs.readdir("./uploads/" + albumName,function (err, files) {

        if (err) {
            callBack(err,null);
            return;
        }

        var allImages = [];

        (function iterator(i) {
            if (i == files.length) {

                callBack(null, allImages);
                return;
            }
            fs.stat("./uploads/" + albumName + "/" + files[i], function (err2, stats) {
                if (err2){
                    callBack(err2,null)
                    return
                }

                if (stats.isFile()){
                    allImages.push(files[i])
                }
                iterator(i + 1)
            })

        })(0);
    })
}