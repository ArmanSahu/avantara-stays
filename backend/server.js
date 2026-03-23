require("dotenv").config();
const app = require("./src/app");
const connectDatabase = require("./src/database/database-connect");
const PORT = process.env.PORT || 8000;

connectDatabase().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server started on port ${PORT}`);
    })
})

