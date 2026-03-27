const express = require("express");
const {signUp,signIn,signOut} = require("../controllers/auth-controller");
const validateInput = require("../middlewares/validate-user-input-middleware");
const router = express.Router();

router.post("/signup",validateInput,signUp);
router.post("/signin",signIn);
router.post("/signout",signOut);



module.exports = router;


