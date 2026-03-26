const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth-routes");
const adminRouter = require("./routes/admin-routes");
const propertyRouter = require("./routes/property-routes");
const bookingRouter = require("./routes/booking-routes");


const app = express();


//middlewares

app.use(express.json());
app.use(cors());
app.use(cookieParser());

//routes

app.use("/auth",authRoute);
app.use("/admin",adminRouter);
app.use("/property",propertyRouter);
app.use("/booking",bookingRouter);


module.exports = app;