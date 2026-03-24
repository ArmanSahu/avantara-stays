const { verifyToken } = require("../utils/tokens/token");


const authMiddleware = (req,res,next) => {
    const token = req.cookies?.token;
    if(!token){
        return res.status(401).json({message:"Unauthorized access"});
    }
    try{
        const decoded = verifyToken(token);
        req.user  = decoded;
        next();
    }catch(err){
        return res.status(401).json({ message: "Invalid token" ,error:err.message});
    }
} 
module.exports = authMiddleware;