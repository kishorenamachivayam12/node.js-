const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({    
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
const checkFileType = (req, file, cb) => {

    if(file.mimetype.startsWith('image/')) {
        cb(null, true);
    }
    else{
        cb('Error: Images only!');
    }
}
module.exports = multer({   
    storage: storage,
    fileFilter: checkFileType,
    limits: { fileSize: 5 * 1024 * 1024 }
})