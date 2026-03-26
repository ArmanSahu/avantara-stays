const bookingModel = require("../models/booking-model");
const mongoose = require("mongoose");


const booking = async(req,res) => {
    const userId = req.user.userId;
    const propertyId = req.propertyId;
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);

    const normalize = (date) => {
        const d = new Date(date);
        d.setHours(0,0,0,0);
        return d;
    }
    
    if(isNaN(startDate) || isNaN(endDate)){
         return res.status(400).json({ message: "Invalid date format" });
    }

    if(normalize(startDate)<normalize(new Date())){
        return res.status(400).json({
            message: "You cannot book past dates"
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
            console.log(existingBooking);
            return res.status(400).json({
                message: `The property is not available from start: ${existingBooking.startDate.toDateString()} to end: ${existingBooking.endDate.toDateString()}`,
                existingBooking
            });
        }
        const newBooking = await bookingModel.create({
            userId,
            propertyId,
            startDate,
            endDate
        });
        return res.status(200).json({
            message: "Your property has been booked",
            newBooking
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
        if(bookings.length === 0 ){
            return res.status(404).json({
                message: "No booking Found"
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

const calender = async(req,res) => {
    const propertyId = req.propertyId;
    try{
        const propertyData = await bookingModel.find({
            propertyId
        });
        if(propertyData.length === 0){
            return res.status(200).json({
                message: "property is not booked for any dates"
            });
        }
        const reservedDates = propertyData.map(property => (
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
        const booking = await bookingModel.findById(bookingId);
        if(!booking){
            return res.status(404).json({message:"No booking found"});
        }
        if(booking.userId.toString() !== userId){
            return res.status(403).json({
                message: "Unauthorized access"
            })
        }
        if(booking.status === "cancelled"){
            return res.status(400).json({
                message: "Booking is already cancelled"
            })
        }
        const bookedAt = new Date(booking.createdAt).getTime();
        const currentTime = new Date().getTime();

        const differenceInMs = currentTime - bookedAt;
        const differenceInMinutes = differenceInMs/(1000*60);

        if(differenceInMinutes>30){
            return res.status(400).json({
                message:"Cancellation window expired"
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
    calender
}