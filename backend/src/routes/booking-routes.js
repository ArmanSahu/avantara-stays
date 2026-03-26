const express = require("express");
const { booking, cancelBooking, getBookings, getBooking, calender } = require("../controller/booking-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const propertyValidation = require("../middlewares/propertyId-validation-middleware");


const router = express.Router();


router.get("/my",authMiddleware,getBookings);
router.get("/my/:bookingId",authMiddleware,getBooking);

router.get("/calender/:propertyId",propertyValidation,calender);


router.post("/:propertyId",authMiddleware,propertyValidation,booking);
router.delete("/:bookingId",authMiddleware,cancelBooking);



module.exports = router;