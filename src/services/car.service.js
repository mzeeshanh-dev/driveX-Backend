import Car from "../models/car.model.js";

export const createCarService = async (carData) => {
    return await Car.create(carData);
};

export const getAllCarsService = async () => {
    return await Car.find().sort({ createdAt: -1 });
};

export const getCarByIdService = async (id) => {
    return await Car.findById(id);
};

export const updateCarService = async (id, updateData) => {
    return await Car.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteCarService = async (id) => {
    return await Car.findByIdAndDelete(id);
};
