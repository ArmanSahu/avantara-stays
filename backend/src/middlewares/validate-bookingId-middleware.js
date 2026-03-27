const mongoose = require("mongoose");

const bookingValidation = (req,res,next) => {
    const bookingId = req.params.bookingId;
    if(!bookingId || !mongoose.Types.ObjectId.isValid(bookingId)){
        return res.status(400).json({
            message: "Invalid bookingId"
        })
    }
    req.bookingId = bookingId;
    next();
}
module.exports = bookingValidation;