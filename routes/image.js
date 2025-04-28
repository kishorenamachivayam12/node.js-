const express=require('express');
const router=express.Router();
const authMiddleware = require('../middleware/middle');
const isadmin = require('../middleware/adminmiddle');
const uploadmiddleware = require('../middleware/uploadmiddle');
const {upload,fetchall,deleteimage}=require('../controllers/image-controller')

router.post('/upload',authMiddleware,isadmin,uploadmiddleware.single('image'),upload);
router.get('/fetchall',authMiddleware,fetchall);
router.delete('/:id',authMiddleware,isadmin,deleteimage);



module.exports=router;
