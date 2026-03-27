const bookingModel = require("../models/booking-model");
const mongoose = require("mongoose");
const normalize = require("../utils/normalizeDates");
const propertyModel = require("../models/property-model");


const booking = async(req,res) => {
    const userId = req.user.userId;
    const propertyId = req.propertyId;

    if (!req.body.startDate || !req.body.endDate) {
        return res.status(400).json({ message: "Dates are required" });
    }
    if (isNaN(new Date(req.body.startDate)) || isNaN(new Date(req.body.endDate))) {
        return res.status(400).json({ message: "Invalid date format" });
    }

    const startDate = normalize(req.body.startDate);

    const endDate = normalize(req.body.endDate);

    const today = normalize(new Date());

    if(startDate < today){
        return res.status(400).json({
            message: "You cannot book past dates"
        }); 
    }

    if (startDate >= endDate) {
        return res.status(400).json({
            message: "End date must be after start date"
        });
    }
    
    try{
        const existingBooking = await bookingModel.findOne({
            propertyId,
            status: "booked",
            startDate : {$lt: endDate},
            endDate: {$gt: startDate}
        });
        if(existingBooking){
            return res.status(400).json({
                message: `The property is not available from start: ${existingBooking.startDate.toDateString()} to end: ${existingBooking.endDate.toDateString()}`,
                existingBooking
            });
        }

        const property = await propertyModel.findById(propertyId);
        if(!property){
            return res.status(404).json({
                message: "Property not found"
            });
        }
        const nightCount = (endDate - startDate) / (1000*60*60*24);
        const totalAmount = nightCount * property.pricePerNight; 

        const newBooking = await bookingModel.create({
            userId,
            propertyId,
            startDate,
            endDate,
            totalAmount
        });
        
        return res.status(201).json({
            message: "Your property has been booked",
            newBooking,
        });
    }catch(err){
        return res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
}

const getBookings = async(req,res) => {
    const userId = req.user.userId
    try{
        const bookings = await bookingModel.find({
            userId,
            status: "booked"
        }).populate("propertyId","title pricePerNight location images");
        console.log(bookings);
        if(bookings.length === 0 ){
            return res.status(200).json({
                message: "No booking Found",
                bookings: []
            });
        }
        return res.status(200).json({
            message: "User bookings",
            bookings
        });
    }catch(err){
        return res.status(500).json({
            message: "Internal server error",
            error : err.message
        });
    }
}

const getBooking = async(req,res) => {
    const bookingId = req.params.bookingId;
    const userId = req.user.userId;
    if(!bookingId || !mongoose.Types.ObjectId.isValid(bookingId)){
        return res.status(400).json({
            message: "Invalid booking Id"
        });
    } 
    try{
        const booking = await bookingModel.findOne({
            _id: bookingId,
            userId
        }).populate("propertyId","title pricePerNight location images");;
        if(!booking){
            return res.status(404).json({
                message: "No booking found"
            });
        }
        return res.status(200).json({
            message: "Booking found",
            booking
        });
    }catch(err){
        return res.status(500).json({
            message: "Internal server Error",
            error: err.message
        });
    }
}

const calendar = async(req,res) => {
    const propertyId = req.propertyId;
    try{
        const bookings = await bookingModel.find({
            propertyId,
            status: "booked"
        });
        if(bookings.length === 0){
            return res.status(200).json({
                message: "property is not booked for any dates"
            });
        }
        const reservedDates = bookings.map(property => (
            {
                startDate : property.startDate,
                endDate : property.endDate
            }
        ));
        return res.status(200).json({
            message: "Reserved dates",
            reservedDates
        });
    }catch(err){
        return res.status(500).json({
            message: "Internal server Error",
            error: err.message
        });
    }
}

const cancelBooking = async(req,res) => {
    const bookingId = req.params.bookingId;
    const userId = req.user.userId;
 
    if(!bookingId || !mongoose.Types.ObjectId.isValid(bookingId)){
        return res.status(400).json({message:"Invalid bookingId"});
    }
    try{
        const booking = await bookingModel.findOne({
            _id: bookingId,
            userId
        });
        if(!booking){
            return res.status(404).json({message:"No booking found"});
        }
        if(booking.status === "cancelled"){
            return res.status(400).json({
                message: "Booking is already cancelled"
            })
        }
        
        const bookingStartDate = normalize(booking.startDate);
        const oneDayBefore = new Date(bookingStartDate);
        oneDayBefore.setDate(oneDayBefore.getDate()-1);
        const today = normalize(new Date());


        if(today > oneDayBefore){
            return res.status(400).json({
                message: "Cancellation allowed only 1 day before check-in"
            });
        }

        booking.status = "cancelled";
        await booking.save();

        return res.status(200).json({
            message:"Booking cancelled successfully",
            booking
        });
    }catch(err){
        return res.status(500).json({
            message: "Internal server Error",
            error: err.message
        })
    }

}



module.exports = {
    booking,
    cancelBooking,
    getBookings,
    getBooking,
    calendar
}