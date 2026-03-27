const express = require("express");
const authMiddleware = require("../middlewares/auth-middleware");
const isAdmin = require("../middlewares/auth-admin-middleware");
const { addProperty, updateProperty, deleteProperty, getProperties, getProperty } = require("../controllers/property-controller");
const validateProperty = require("../middlewares/validate-property-middelware");

const router = express.Router();
//rRoutes accessible to everyone 
router.get("/",getProperties);
router.get("/:propertyId",getProperty);



//Admin Routes
router.post("/", authMiddleware, isAdmin, validateProperty, addProperty);
router.put("/:propertyId", authMiddleware, isAdmin, updateProperty);
router.delete("/:propertyId", authMiddleware, isAdmin, deleteProperty);




module.exports = router;