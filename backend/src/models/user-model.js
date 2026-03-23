const mongoose = require("mongoose");
const {hashPass,comparePass} = require("../utils/password/password");
const {Schema,model} = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        require: true,
        select: false
    },
    role:{
        type: String,
        enum : ["user","admin"],
        default: "user"
    }
},{
    timestamps: true
});

userSchema.pre("save",async function(){
    if(!this.isModified("password")){
        return ;
    }
    this.password = await hashPass(this.password);
});

userSchema.methods.comparePassword = async function(password){
    return await comparePass(password,this.password);
} 


const userModel = model("users",userSchema);

module.exports = userModel;



