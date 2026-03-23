const userModel = require("../models/user-model");
const { generateAdminToken } = require("../utils/tokens/token");

const signIn = async(req,res) => {
    const {email,password} = req.body;
    if(!email){
        return res.status(400).json({message:"Enter correct email"});
    }
    try{
        const admin = await userModel.findOne({email}).select("+password");
        if(!admin || admin.role !== "admin"){
            return res.status(401).json({message: "admin with this email not found"});
        }
        const isValid = await admin.comparePassword(password);
        if(!isValid){
            return res.status(401).json({message: "Invalid Password"});
        }
        const token = generateAdminToken(admin);
        res.cookie("token",token,{
            maxAge: 7*24*60*60*1000,
            httpOnly: true,
            sameSite: "strict",
            secure: false
        });
        res.status(200).json({message: "Admin signed in successfully"});
    }catch(err){    
        return res.status(500).json({message:"Internal server error",error:err.message});
    }
}
const signOut = async(req,res) => {
    res.clearCookie("token",{
        httpOnly: true,
        secure: false
    });
    return res.status(200).json({message:"Signedout successfully"});
}
module.exports = {signIn,signOut};