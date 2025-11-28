import { createCarService, getAllCarsService } from "../services/car.service.js";

export const createCar = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ success: false, message: "Image is required" });

        const carData = {
            ...req.body,
            image: req.file.path, // Cloudinary public URL
        };

        const newCar = await createCarService(carData);

        res.status(201).json({
            success: true,
            message: "Car added successfully",
            data: newCar,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getAllCars = async (req, res) => {
    try {
        const cars = await getAllCarsService();
        res.status(200).json({
            success: true,
            count: cars.length,
            data: cars,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
