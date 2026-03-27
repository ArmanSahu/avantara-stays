const express = require("express");
const { booking, cancelBooking, getBookings, getBooking, calendar } = require("../controllers/booking-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const propertyValidation = require("../middlewares/validate-propertyId-middleware");


const router = express.Router();


router.get("/my",authMiddleware,getBookings);
router.get("/my/:bookingId",authMiddleware,getBooking);

router.get("/calendar/:propertyId",propertyValidation,calendar);


router.post("/:propertyId",authMiddleware,propertyValidation,booking);
router.delete("/:bookingId",authMiddleware,cancelBooking);



module.exports = router;