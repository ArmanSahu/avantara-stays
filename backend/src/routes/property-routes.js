const express = require("express");
const authMiddleware = require("../middlewares/auth-middleware");
const isAdmin = require("../middlewares/isAdmin-middleware");
const { addProperty, updateProperty, deleteProperty, getProperties, getProperty } = require("../controller/property-controller");
const validateProperty = require("../middlewares/property-validation-middelware");

const router = express.Router();
//rRoutes accessible to everyone 
router.get("/",getProperties);
router.get("/:propertyId",getProperty);



//Admin Routes
router.post("/", authMiddleware, isAdmin, validateProperty, addProperty);
router.put("/:propertyId", authMiddleware, isAdmin, updateProperty);
router.delete("/:propertyId", authMiddleware, isAdmin, deleteProperty);




module.exports = router;