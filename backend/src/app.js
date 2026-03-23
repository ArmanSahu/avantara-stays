const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth-routes");


const app = express();


//middlewares

app.use(express.json());
app.use(cors());
app.use(cookieParser());

//routes

app.use("/auth",authRoute);


module.exports = app;