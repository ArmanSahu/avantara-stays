const {z} = require("zod");

const emailSchema = z.email();
const usernameSchema = z.string().trim().min(4,"username shpuld be minimum of 4 characters").max(40,"username cannot exceed 40 characters");
const passwordSchema = z.string().trim().min(7,"Password should be minimu of 7 character").max(30,"password cannot exceed 30 characters").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "password should contain 1 uppercase 1 lowercase 1 number and 1 special character"
);

const userSchema = z.object({
    email: emailSchema,
    username: usernameSchema,
    password: passwordSchema
});


function validateInput(req,res,next){
    const result = userSchema.safeParse(req.body);
    if(!result.success){
        return res.status(401).json({message:"Invalid details",error: result.error.flatten()});
    }
    req.body = result.data;
    next();
}

module.exports = validateInput;