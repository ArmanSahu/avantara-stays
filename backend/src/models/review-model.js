const mongoose = require("mongoose");
const {Schema,model} = mongoose;
const ObjectId = Schema.Types.ObjectId;

const reviewSchema = new Schema({
    userId: {
        type: ObjectId,
        required: true,
        ref: "users"
    },
    propertyId: {
        type: ObjectId,
        required: true,
        ref: "Property"
    },
    bookingId:{
        type: ObjectId,
        required: true,
        unique: true,  
        ref: "Bookings"
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    review: {
        type: String
    } 
},{
    timestamps: true
});

reviewSchema.index({propertyId: 1});
reviewSchema.index({userId:1,propertyId:1});

const reviewModel = model("Reviews",reviewSchema);

module.exports = reviewModel;