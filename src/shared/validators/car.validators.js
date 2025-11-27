import Joi from "joi";

export const carValidationSchema = Joi.object({
    carname: Joi.string().min(2).max(100).required(),
    brand: Joi.string().min(2).max(100).required(),
    pricePerDay: Joi.number().positive().required(),
    category: Joi.string().min(2).max(100).required(),
    features: Joi.array().items(Joi.string()).default([]),
    image: Joi.string().optional(),
    status: Joi.string().valid("available", "booked").required()
});
