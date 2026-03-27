const mongoose = require("mongoose");
const {Schema,model} = mongoose;
const ObjectId = Schema.Types.ObjectId;

const propertySchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    pricePerNight: {
        type: Number,
        required: true
    },
    location:{
        address: String,
        city: String,
        state: String,
        country: String
    },
    images: [String],
    amenities: [String],
    isAvailable: {
        type: Boolean,
        default: true
    },
    maxGuests: {
        type: Number,
        required: true
    },
    bedrooms: Number,
    bathroom: Number,
    averageRating: {
        type: Number,
        default: 0
    },
    totalReviews: {
        type: Number,
        default: 0
    },
    createdBy:{
        type: ObjectId,
        ref: "users",
        required: true
    } 
},{
    timestamps: true
});

const propertyModel =  model("Property",propertySchema);
module.exports = propertyModel;