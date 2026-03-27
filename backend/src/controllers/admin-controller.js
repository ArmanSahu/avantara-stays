const userModel = require("../models/user-model");
const { generateToken } = require("../utils/tokens/token");

/* 
    SignIn Controller
*/

const signIn = async(req,res) => {

    const {email,password} = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and password required",
            error: "Missing credentials"
        });
    }
    try{

        const admin = await userModel.findOne({email}).select("+password");
        if(!admin || admin.role !== "admin"){
            return res.status(401).json({
                success: false,
                message: "Unauthorized access",
                error: "Only admin can login here"
            });
        }

        const isValid = await admin.comparePassword(password);
        if(!isValid){
            return res.status(401).json({
                success: false,
                message: "Invalid Password",
                error: "Incorrect password"
            });
        }

        const token = generateToken(admin);
        res.cookie("token",token,{
            maxAge: 3*24*60*60*1000,
            httpOnly: true,
            sameSite: "strict",
            secure: false
        });

        res.status(200).json({
            success: true,
            message: "Admin signIn successful",
            data: null
        });

    }catch(err){    
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
}

/* 
    SignOut Controller
*/

const signOut = async(req,res) => {

    res.clearCookie("token",{
        httpOnly: true,
        secure: false
    });

    return res.status(200).json({
        success: true,
        message:" Admin Signout successful",
        data: null
    });
}
module.exports = {signIn,signOut};