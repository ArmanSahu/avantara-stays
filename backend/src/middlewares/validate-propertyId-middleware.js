const mongoose = require("mongoose");

const propertyValidation = (req,res,next) => {
    const propertyId = req.params.propertyId;
    if(!propertyId || !mongoose.Types.ObjectId.isValid(propertyId)){
        return res.status(400).json({
            message: "Invalid propertyId"
        })
    }
    req.propertyId = propertyId;
    next();
}
module.exports = propertyValidation;