const jwt = require("jsonwebtoken");

function generateUserToken(user){
    return jwt.sign({
        userId: user._id
    },process.env.USER_JWT_SECRET,{
        expiresIn: "3d"
    });
}

function verifyUserToken(token){
    return jwt.verify(token,USER_JWT_SECRET);
}

function generateAdminToken(admin){
    return jwt.sign({
        adminId: admin._id,
        role: admin.role
    },process.env.ADMIN_JWT_SECRET),{
        expiresIn:"7d"
    }
}

function verifyAdminToken(token){
    return jwt.verify({
        token,ADMIN_JWT_SECRET
    });
}

module.exports = {
    generateUserToken,
    verifyUserToken,
    generateAdminToken,
    verifyAdminToken
}