require("dotenv").config();
const userModel = require("../models/user-model");

const connectDb = require("../database/database-connect");

const createAdmin = async() => {
    try{
        await connectDb();
        console.log("connected to db");

        const existingAdmin = await userModel.findOne({
            email:process.env.ADMIN_EMAIL,
        });
        if(existingAdmin){
            console.log("Admin already exists");
            process.exit(1);
        }
        await userModel.create({
            email: process.env.ADMIN_EMAIL,
            username: process.env.ADMIN_USERNAME,
            password: process.env.ADMIN_PASSWORD,
            role: "admin"
        });
        console.log("Admin created successfully");
        process.exit(0);
    }catch(err){
        console.log(err.message);
        process.exit(1);
    }
}
createAdmin();