import express from "express";
import { createCar, getAllCars } from "../controllers/car.controller.js";
import { validate } from "../middleware/validate.js";
import { carValidationSchema } from "../shared/validators/car.validators.js";

const router = express.Router();

router.post("/cars/add", validate(carValidationSchema), createCar);
router.get("/cars/all", getAllCars);

export default router;
