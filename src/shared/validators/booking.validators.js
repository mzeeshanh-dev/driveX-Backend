import Joi from "joi";

export const bookingValidator = Joi.object({
    carId: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    contact: Joi.string().required(),
    pickupDate: Joi.date().required(),
    dropoffDate: Joi.date().required()
});
