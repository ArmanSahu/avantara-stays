const { default: mongoose } = require("mongoose")
const reviewModel = require("../models/review-model");
const propertyModel = require("../models/property-model");


const aggregateReviews = async(propertyId) => {
    try{
        const stats = await reviewModel.aggregate([
            {$match : {propertyId: new mongoose.Types.ObjectId(propertyId)}},
            {
                $group:{
                    _id: "$propertyId",
                    averageRating: {$avg : "$rating"},
                    totalReviews: {$sum: 1}
                }
            }
        ]);
        
        const averageRating = stats.length ? stats[0].averageRating : 0;
        const totalReviews = stats.length ? stats[0].totalReviews : 0;

        await propertyModel.findByIdAndUpdate(propertyId,{
            averageRating,
            totalReviews
        });
    }catch(err){
       throw new Error(err.message);
    }
}

module.exports = aggregateReviews;