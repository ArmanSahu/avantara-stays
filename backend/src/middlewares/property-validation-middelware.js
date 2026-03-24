const {z} = require("zod");

const propertySchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    pricePerNight: z.number().positive(),
    location: z.object({
        address: z.string(1).min(1),
        city: z.string(1).min(1),
        state: z.string(1).optional(),
        country: z.string(1).min(1)
    }),
    images: z.array(z.string()).optional(),
    amenities: z.array(z.string()).optional(),
    maxGuests: z.number().positive(),
    bedrooms: z.number().optional(),
    bathrooms: z.number().optional()
})

const validateProperty = (req,res,next) => {
   const result = propertySchema.safeParse(req.body);
   if(!result.success){
        return res.status(400).json({
            message: "Invalid details",
            error: result.error
        });
   }
   req.body = result.data;
   next();
}

module.exports = validateProperty;