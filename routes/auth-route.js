const express = require('express');
const router = express.Router();
const {registeruser,loginuser,changepassword}=require('../controllers/auth-contol');
const authMiddleware = require('../middleware/middle');

//route
router.post('/register',registeruser);
router.post('/login',loginuser);
router.post('/changepassword',authMiddleware,changepassword);




module.exports=router;