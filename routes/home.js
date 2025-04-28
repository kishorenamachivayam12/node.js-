const express=require('express');
const router=express.Router();
const auth =require('./auth-route');
const authMiddleware = require('../middleware/middle');
 router.get('/welcome', authMiddleware,(req,res)=>{
    res.send("Home page");
 }  );
module.exports=router;