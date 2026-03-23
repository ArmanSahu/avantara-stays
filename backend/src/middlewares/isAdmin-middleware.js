

const isAdmin = (req,res,next) => {
    const admin = req.user;
    if(admin.role !== "admin"){
        return res.status(403).json({message:"Access Denied"});
    }
    next();
}