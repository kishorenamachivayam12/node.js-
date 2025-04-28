const User=require('../models/user');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
require('dotenv').config();
const registeruser=async(req,res)=>{    
    try{
        const {username,email,password,role}=req.body;
        const userexists=await User.findOne({$or:[{username},{email}]});
        if(userexists){
            return res.status(400).json({message:"User already exists"});
        }
        const salt=await bcrypt.genSalt(10);
        const hashedpassword=await bcrypt.hash(password,salt);
        const user=new User({
            username,
            email,
            password:hashedpassword,
            role,
        });
        await user.save();
        if (user){
            return res.status(201).json({message:"User registered successfully"});  
        }
        else{
            return res.status(400).json({message:"User registration failed"});
        }


    }
    catch(e){
        console.log(e.message);
        res.status(500).json({message:"Internal server error"});
    }
}
const loginuser=async(req,res)=>{
    try{
        const {username,password}=req.body;
        const user=await User.findOne({username});
        if(!user){
            return res.status(400).json({message:"Invalid credentials"});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"});
        }
        const token=jwt.sign({
            userId:user._id,
            username:user.username, 
            role:user.role
        },process.env.JWT_SECRET_KEY,{
            expiresIn:'1d'
        });
        res.status(200).json({
            sucess:true,
            message:"Login Sucessfull",
            token
        })
    }
    catch(e){
        console.log(e.message);
        res.status(500).json({message:"Internal server error"});
    }

}
const changepassword=async(req,res)=>{
    try{
    const userid =req.user.userId;
    const {oldpassword,newpassword}=req.body;
    const user =await User.findById(userid);
    if(!user){
        return res.status(400).json({
            success:false,
            message:"User not found"
        })
    }
    const isMatch=await bcrypt.compare(oldpassword,user.password);
    if(!isMatch){
        return res.status(400).json({
            success:false,
            message:"Old password is incorrect"
        })
    }
    const salt=await bcrypt.genSalt(10);
    const hashedpassword=await bcrypt.hash(newpassword,salt);
    user.password=hashedpassword;
    await user.save();
    return res.status(200).json({
        success:true,
        message:"Password changed successfully"
    })

    }
    catch(e){
        console.log(e.message);
        res.status(500).json({message:"Internal server error"});
    }

}
module.exports={
    registeruser,
    loginuser,
    changepassword
}