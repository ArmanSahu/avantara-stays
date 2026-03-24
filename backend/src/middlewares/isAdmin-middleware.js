
const isAdmin = (req,res,next) => {
    const admin = req.user;
    console.log(admin.role);
    if(admin.role !== "admin"){
        return res.status(403).json({message:"Access Denied"});
    }
    next();
}

module.exports = isAdmin;