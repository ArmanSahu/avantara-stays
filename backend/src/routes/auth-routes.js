const express = require("express");
const {signUp,signIn,signOut} = require("../controller/user-controller");
const validateInput = require("../middlewares/user-input-validation");
const router = express.Router();

router.post("/signup",validateInput,signUp);
router.post("/signin",signIn);
router.post("/signout",signOut);


module.exports = router;


