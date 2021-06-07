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
                var fieldName = file.fieldname;
                
                if(fieldName == "property"){
                    if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg' && ext !== '.webp' && ext !== '.jfif') {
                        return callback(new Error('Only images are allowed [ png , jpg & jpeg ]'));
                    }
                    callback(null, true);   
                }
                if(fieldName=="profile"){
                    if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg' && ext !== '.webp' && ext !== '.jfif') {
                        return callback(new Error('Only images are allowed for profile'));
                    }
                    callback(null, true);
                }
                if(fieldName=="service"){
                    if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg' && ext !== '.webp' && ext !== '.jfif') {
                        return callback(new Error('Only images are allowed for profile'));
                    }
                    callback(null, true);
                }
            }
}

var upload = multer(multerOptions).fields([{name:"profile", maxCount:1},{name:'property' , maxCount:7},{name:'service',maxCount:1}]);

module.exports = upload;