const admin=require('./middle')

const isadmin= (req, res, next) => {
    if(req.user.role === 'admin') {
        next();
    }
    else {
        return res.status(403).json({message:"Admin access denied"});
    }
}
module.exports = isadmin;