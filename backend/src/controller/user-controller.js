const userModel = require("../models/user-model");
const {generateUserToken} = require("../utils/tokens/token");

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
        const newUser = await userModel.create({
            email,
            username,
            password
        });
        res.status(200).json("User signup successfully");
    }catch(err){
        return res.status(500).json("Internal server error");
    }
}

const signIn = async(req,res) => {
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(401).json({message: "Enter correct username or password"});
    }
    try{
        const user = userModel.findOne({
            email
        }).select("+password");
        if(!user){
            return res.status(401).json({message: "Invalid login credentials"});
        }
        const isValid = await userModel.comparePassword(user.password);

        if(!isValid){
            return res.status(401).json({message: "Invalid credentials"});
        }
        const token = generateUserToken(user);
        
    }
}