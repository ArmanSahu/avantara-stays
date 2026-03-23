const mongoose = require("mongoose");

async function connectDatabase(){
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connected");
    }catch(err){
        console.log(`Cannot connect to DB ${err.message}`);
        process.exit(1);
    }
}

module.exports = connectDatabase;