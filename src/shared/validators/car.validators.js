import Joi from "joi";

export const carValidationSchema = Joi.object({
    carname: Joi.string().required(),
    brand: Joi.string().required(),
    pricePerDay: Joi.number().required(),
    category: Joi.string().required(),
    features: Joi.array().items(Joi.string()).optional(),
    status: Joi.string().valid("available", "unavailable").required(),
});
