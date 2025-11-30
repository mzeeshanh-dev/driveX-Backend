import {
    createCarService,
    getAllCarsService,
    getCarByIdService,
    updateCarService,
    deleteCarService,
    getAllAvailableCarsService
} from "../services/car.service.js";
import { deleteImage } from "../utils/cloudinary.js";

export const createCar = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Image is required" });
        }

        // parse features array if sent as JSON string
        let featuresArray = [];
        if (req.body.features) {
            featuresArray = typeof req.body.features === "string" ? JSON.parse(req.body.features) : req.body.features;
        }

        const carData = {
            ...req.body,
            features: featuresArray,
            image: req.file.path,
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

export const updateCar = async (req, res) => {
    try {
        const carId = req.params.id;
        const car = await getCarByIdService(carId);
        if (!car) return res.status(404).json({ success: false, message: "Car not found" });

        // handle features array
        if (req.body.features) {
            req.body.features = typeof req.body.features === "string" ? JSON.parse(req.body.features) : req.body.features;
        }

        // handle image replacement
        if (req.file) {
            const oldPublicId = car.image.split("/").slice(-2).join("/").split(".")[0];
            await deleteImage(oldPublicId);
            req.body.image = req.file.path;
        }

        const updatedCar = await updateCarService(carId, req.body);

        res.status(200).json({
            success: true,
            message: "Car updated successfully",
            data: updatedCar,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteCar = async (req, res) => {
    try {
        const carId = req.params.id;
        const car = await getCarByIdService(carId);
        if (!car) return res.status(404).json({ success: false, message: "Car not found" });

        const publicId = car.image.split("/").slice(-2).join("/").split(".")[0];
        await deleteImage(publicId);
        await deleteCarService(carId);

        res.status(200).json({ success: true, message: "Car deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getAllAvailableCars = async (req, res) => {
    try {
        const cars = await getAllAvailableCarsService();
        res.status(200).json({
            success: true,
            count: cars.length,
            data: cars,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
