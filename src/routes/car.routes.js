import express from "express";
import { upload } from "../middleware/upload.js";
import { validate } from "../middleware/validate.js";
import { carValidationSchema } from "../shared/validators/car.validators.js";
import {
    createCar,
    getAllCars,
    updateCar,
    deleteCar,
    getAllAvailableCars
} from "../controllers/car.controller.js";

const router = express.Router();

router.post("/cars/add", upload.single("image"), validate(carValidationSchema), createCar);
router.get("/cars/all", getAllCars);
router.put("/cars/edit/:id", upload.single("image"), updateCar);
router.delete("/cars/delete/:id", deleteCar);
router.get("/cars/available", getAllAvailableCars);

export default router;
