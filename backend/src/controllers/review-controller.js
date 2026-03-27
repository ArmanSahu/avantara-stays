const  mongoose  = require("mongoose");
const bookingModel = require("../models/booking-model");
const propertyModel = require("../models/property-model");
const reviewModel = require("../models/review-model");
const aggregateReviews = require("../utils/reviews-group-data");


const postReview = async(req,res) => {
    const userId = req.user.userId;
    const propertyId = req.propertyId;
    const bookingId = req.bookingId;
    const {review,rating} = req.body

    if(rating === undefined){
        return res.status(400).json({
            message: "User must provide a rating"
        });
    }
   
    if(rating<0 || rating>5 ){
        return res.status(400).json({
            message: "Rating cannot be less than 0 or greater tha 5"
        })
    }

    try{
        const booking = await bookingModel.findOne({
            _id: bookingId,
            userId,
            propertyId,
        });
        if(!booking){
            return res.status(400).json({
                message: "No booking of this property by this user"
            });
        }
        if(booking.endDate > Date.now()){
            return res.status(400).json({
                message: "You can rate it only after your booking is completed"
            });
        }
        await reviewModel.create({
            userId,
            propertyId,
            bookingId,
            rating: rating,
            review: review ? review : undefined
        });
        await aggregateReviews(propertyId);
        return res.status(200).json({
            message: "Thankyou for your reviews"
        });
    }catch(err){
        if(err.code === 11000){
            return res.status(400).json({
                message: "cannot send multiple reviews for the same booking",
                error: err.message
            })
        }
        return res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
}

const getReviews = async(req,res) => {
    try{
        const propertyId = req.propertyId;
        const property = await propertyModel.findById(propertyId);
        if(!property){
            return res.status(404).json({
                message: "property not found"
            })
        }
        return res.status(200).json({
            message: "Successful",
            reviewDetails: {
                averageRating: property.averageRating || 0,
                totalReviews: property.totalReviews || 0
            }
        })
    }catch(err){
        return res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
}
const updateReview = async(req,res) => {
    const {review,rating } = req.body;
    const userId =req.user.userId;
    const reviewId = req.params.reviewId;
    if(!reviewId || !mongoose.Types.ObjectId(reviewId)){
        return res.status(400).json({
            message: "Invalid review Id"
        });
    }

    if(rating === undefined){
        return res.status(400).json({
            message: "User must provide a rating"
        });
    }

    if(rating<1 || rating>5 ){
        return res.status(400).json({
            message: "Rating cannot be less than 0 or greater tha 5"
        })
    }

    try{
        const oldReview = await reviewModel.findOne({
            userId,
            _id: reviewId
        });
        if(!oldReview){
            return res.status(404).json({
                message: "Could not find any reviews"
            });
        }
        oldReview.rating = rating;
        if(review !== undefined){
            oldReview.review = review;
        }
        console.log(oldReview);
        await oldReview.save();
        await aggregateReviews(oldReview.propertyId);
        return res.status(200).json({
            message: "Updated your rating"
        })
    }catch(err){
        return res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
}

const deleteReview = async(req,res) => {
    const userId =req.user.userId;
    const reviewId = req.params.reviewId;
    if(!reviewId || ! mongoose.Types.ObjectId.isValid(reviewId)){
        return res.status(400).json({
            message: "Invalid review Id"
        });
    }

    try{
        const deletedReview = await reviewModel.findOneAndDelete({
            _id : reviewId,
            userId
        });
        if(!deletedReview){
            return res.status(404).json({
                message: "Review not found"
            });
        }
        await aggregateReviews(deletedReview.propertyId);
        return res.status(200).json({
            message: "deleted review",
            deletedReview
        })
    }catch(err){
        return res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }    
}



module.exports = {
    postReview,
    getReviews,
    updateReview,
    deleteReview
}