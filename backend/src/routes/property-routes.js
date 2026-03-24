const express = require("express");
const authMiddleware = require("../middlewares/auth-middleware");
const isAdmin = require("../middlewares/isAdmin-middleware");
const { addProperty, updateProperty, deleteProperty } = require("../controller/property-controller");
const validateProperty = require("../middlewares/property-validation-middelware");

const router = express.Router();

router.use(authMiddleware);

router.post("/add",isAdmin,validateProperty,addProperty);
router.put("/update/:propertyId",isAdmin,updateProperty);
router.delete("/:propertyId",isAdmin,deleteProperty);




module.exports = router;