const express = require("express");
const authMiddleware = require("../middlewares/auth-middleware");
const propertyValidation = require("../middlewares/propertyId-validation-middleware");
const bookingValidation = require("../middlewares/bookingId-validation-middleware");
const { postReview, getReviews, updateReview, deleteReview } = require("../controller/review-controller");


const router = express.Router();

router.post("/:propertyId/:bookingId/",authMiddleware,propertyValidation,bookingValidation,postReview);
router.get("/:propertyId",propertyValidation,getReviews);
router.put("/:reviewId",authMiddleware,updateReview);
router.delete("/:reviewId",authMiddleware,deleteReview);




module.exports = router;