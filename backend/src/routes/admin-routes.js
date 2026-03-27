const express = require("express");
const { signIn, signOut } = require("../controllers/admin-controller");


const router = express.Router();


router.post("/signin",signIn);
router.post("/signout",signOut);


module.exports = router;