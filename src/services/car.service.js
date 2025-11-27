import Car from "../models/car.model.js";

export const createCarService = async (carData) => {
    return await Car.create(carData);
};

export const getAllCarsService = async () => {
    return await Car.find().sort({ createdAt: -1 });
};
