const express = require("express");
const { signIn, signOut } = require("../controller/admin-controller");


const router = express.Router();


router.post("/signin",signIn);
router.post("/signout",signOut);


module.exports = router;