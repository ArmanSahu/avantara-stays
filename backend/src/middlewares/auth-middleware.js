const { verifyToken } = require("../utils/tokens/token");


const authMiddleware = async(req,res,next) => {
    const token = res.cookies?.token;
    if(!token){
        return res.status(401).json({message:"Unauthorized access"});
    }
    try{
        const decoded = verifyToken(token);
        req.user  = decoded;
        next();
    }catch(err){
        return res.status(401).json({ message: "Invalid token" });
    }
} 
module.exports = authMiddleware;