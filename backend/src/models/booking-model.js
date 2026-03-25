const mongoose = require("mongoose");
const {Schema,model} = mongoose;
const ObjectId = Schema.Types.ObjectId;

const bookingSchema = new Schema({
    userId:{
        type: ObjectId,
        required: true,
        ref: "users"
    },
    propertyId: {
        type: ObjectId,
        required: true,
        ref: "properties"
    },
    startDate:{
        type: Date,
        required: true
    },
    endDate:{
        type: Date,
        required: true
    },
    status:{
        type: String,
        enum: ["booked","cancelled"],
        default: "booked"
    }
},{
    timestamps: true
});

bookingSchema.pre("save",function(next){
    if(this.startDate >= this.endDate){
        return next(new Error("Start date must be before the end date"));
    }
    next();
});
bookingSchema.index({propertyId:1});
bookingSchema.index({userId:1});
bookingSchema.index({propertyId: 1,startDate: 1,endDate:1});

const bookingModel = model("Bookings",bookingSchema);
module.exports = bookingModel;