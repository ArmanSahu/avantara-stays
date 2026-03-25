const propertyModel = require("../models/property-model");
const mongoose = require("mongoose");

const getProperties = async(req,res) => {
    try{
        const properties = await propertyModel.find({}).limit(10).sort({createdAt:1});
        return res.status(200).json({
            message: "All properties",
            properties
        });
    }catch(err){
        return res.status(500).json({
            message: "Internal server Error",
            error: err.message
        });
    }
}

const getProperty = async(req,res) => {
    const propertyId = req.params.propertyId; 
    if(!propertyId || !mongoose.Types.ObjectId.isValid(propertyId)){
        return res.status(400).json({message:"Invalid property ID"});
    }
    try{
        const property = await propertyModel.findById(propertyId);
        if(!property){
            return res.status(404).json({message:"Property not found"});
        }
        return res.status(200).json({
            message: "Property found",
            property
        });
    }catch(err){
        return res.status(500).json({
            message: "Internal server Error",
            error: err.message
        });
    }    
}

const addProperty = async(req,res) => {
   const propertyDetails = req.body;

   try{
        const property = await propertyModel.create({
            ...propertyDetails,
            createdBy: req.user.userId
        });
        return res.status(200).json({
            message:"property created",
            propertyId: property._id
        });
   }catch(err){
        return res.status(500).json({
            message:"Internal server error",
            error: err.message
        });
   }
}

const updateProperty = async(req,res) => {
    const propertyId = req.params.propertyId;
    if(!propertyId || !mongoose.Types.ObjectId.isValid(propertyId)){
        return res.status(401).json({message: "Invalid request"});
    }
    const data = req.body;
    if(Object.keys(data).length === 0){
        return res.status(400).json({message:"Invalid data"});
    }
    try{
        const property = await propertyModel.findById(propertyId);
        if(!property){
            return res.status(400).json({message:"Property not found"});
        }
        Object.assign(property, data);;
        await property.save();
        return res.status(200).json({
            message: "property details updated",
            propertyId: property._id
        });
    }catch(err){
        return res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
}

const deleteProperty = async(req,res) => {
    const propertyId = req.params.propertyId;
    try{
        const property = await propertyModel.findOneAndDelete({
            _id: propertyId,
            createdBy: req.user.userId
        });
        if(!property){
             return res.status(404).json({
                message: "Property not found or unauthorized"
            });
        }
        res.status(200).json({
            message: "property deleted successfully",
            propertyId: property._id
        });
    }catch(err){
        return res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
}


module.exports = {
    addProperty,
    updateProperty,
    deleteProperty,
    getProperties,
    getProperty
}