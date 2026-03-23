const userModel = require("../models/user-model");
const {generateToken} = require("../utils/tokens/token");

const signUp = async(req,res) => {
    const {email,username,password} = req.body;
    try{
        const user = await userModel.findOne({
            email
        });
        if(user){
            return res.status(409).json({
                message: "User already exists"
            })
        }
        await userModel.create({
            email,
            username,
            password
        });
        res.status(200).json("User signup successfully");
    }catch(err){
        return res.status(500).json({message:"Internal server error",error:err.message});
    }
}

const signIn = async(req,res) => {
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({message: "Enter correct email or password"});
    }
    try{
        const user = await userModel.findOne({
            email
        }).select("+password");
        if(!user){
            return res.status(401).json({message: "Invalid login credentials"});
        }
       const isValid = await user.comparePassword(password);

        if(!isValid){
            return res.status(401).json({message: "Invalid credentials"});
        }
        const token = generateToken(user);
        res.cookie("token",token,{
            maxAge: 3*24*60*60*1000,
            httpOnly: true,
            sameSite: "strict",
            secure: false
        });
        res.status(200).json({message:"User signed successfully"});
    }catch(err){
        return res.status(500).json({message: "Internal server error",error:err.message});
    }
}

const signOut = async(req,res) => {
    res.clearCookie("token",{
        httpOnly: true,
        sameSite: "strict"
    });
    return res.status(200).json({message:"Signedout successfully"});
}


module.exports = {
    signUp,
    signIn,
    signOut,
}