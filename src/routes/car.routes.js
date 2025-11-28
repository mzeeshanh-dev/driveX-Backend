import express from "express";
import { createCar, getAllCars } from "../controllers/car.controller.js";
import { upload } from "../middleware/upload.js";
import { validate } from "../middleware/validate.js";
import { carValidationSchema } from "../shared/validators/car.validators.js";

const router = express.Router();

router.post("/cars/add", upload.single("image"), validate(carValidationSchema), createCar);
router.get("/cars/all", getAllCars);

export default router;
