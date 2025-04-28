require('dotenv').config();
const mongoose = require('mongoose');
const connecttodb=async()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/users")
        console.log("Connected to MongoDB");

    }
    catch(e){
        console.log(e);
    }
}
module.exports=connecttodb;