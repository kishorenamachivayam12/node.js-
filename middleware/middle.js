const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
   try{
    const header= req.headers["authorization"];
    const token=header && header.split(" ")[1];
    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }  
    const decoded=jwt.verify(token,JWT_SECRET_KEY);
    console.log(decoded);
    req.user=decoded;
    next();
    
   }
   catch(e){
    console.log(e.message);
    res.status(500).json({message:"Internal server error"});
   }    


}



module.exports = authMiddleware;