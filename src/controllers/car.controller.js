import { createCarService, getAllCarsService } from "../services/car.service.js";

export const createCar = async (req, res) => {
    try {
        const newCar = await createCarService(req.body);
        return res.status(201).json({
            success: true,
            message: "Car added successfully",
            data: newCar,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getAllCars = async (req, res) => {
    try {
        const cars = await getAllCarsService();
        return res.status(200).json({
            success: true,
            count: cars.length,
            data: cars,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
