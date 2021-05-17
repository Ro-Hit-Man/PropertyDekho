var path = require('path');
var multer = require('multer');

var storage = multer.diskStorage(
    {
        destination: function(req,file,cd){
                        cd(null,'userUploads');
                    },
        filename: function(req,file,cd){
                        var ext = path.extname(file.originalname);
                        cd(null,file.fieldname+'-'+Date.now()+'.'+ext);
                    }
    }
)

var multerOptions = {
            storage: storage,
            fileFilter: function(req,file,callback){
                var ext = path.extname(file.originalname);
                if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
                    return callback(new Error('Only images are allowed [ png , jpg & jpeg ]'));
                }
                callback(null, true);
            }
}

var upload = multer(multerOptions).fields([{name:'property' , maxCount:7}]);

module.exports = upload;