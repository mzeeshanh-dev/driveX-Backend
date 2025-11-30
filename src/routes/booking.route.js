import express from "express";
import { validate } from "../middleware/validate.js";
import { bookingValidator } from "../shared/validators/booking.validators.js";
import {
    createBookingController,
    getAllBookingsController,
    getSingleBookingController,
    updateBookingStatusController,
    deleteBookingController
} from "../controllers/booking.controller.js";

const router = express.Router();

router.post("/booking/add", validate(bookingValidator), createBookingController);
router.get("/booking/all", getAllBookingsController);
router.get("/booking/:id", getSingleBookingController);
router.patch("/booking/edit/:id/status", updateBookingStatusController);
router.delete("/booking/delete/:id", deleteBookingController);

export default router;
