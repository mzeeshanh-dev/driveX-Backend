import Booking from "../models/booking.model.js";
import Car from "../models/car.model.js";
import {
    createBookingService,
    getAllBookingsService,
    getBookingByIdService,
    updateBookingStatusService,
    deleteBookingService
} from "../services/booking.service.js";

export const createBookingController = async (req, res) => {
    try {
        const { carId, name, email, contact, pickupDate, dropoffDate } = req.body;
        const car = await Car.findById(carId);
        if (!car) return res.status(404).json({ success: false, message: "Car not found" });

        const pickup = new Date(pickupDate);
        const dropoff = new Date(dropoffDate);
        if (dropoff < pickup) return res.status(400).json({ success: false, message: "Drop-off date must be after pickup date" });
        const days = Math.ceil((dropoff - pickup) / (1000 * 60 * 60 * 24)) || 1;
        const totalPrice = days * car.pricePerDay;

        const lastBooking = await Booking.findOne().sort({ createdAt: -1 });
        let nextIdNumber = 1;
        if (lastBooking) {
            const lastIdNum = parseInt(lastBooking.bookingId.replace("BK", ""));
            nextIdNumber = lastIdNum + 1;
        }
        const bookingId = `BK${String(nextIdNumber).padStart(3, "0")}`;

        const bookingData = {
            carId,
            carName: car.carname,
            pricePerDay: car.pricePerDay,
            totalPrice,
            name,
            email,
            contact,
            pickupDate,
            dropoffDate,
            bookingId,
            status: "Pending"
        };

        const newBooking = await createBookingService(bookingData);

        res.status(201).json({
            success: true,
            bookingId: newBooking.bookingId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to create booking", error: error.message });
    }
};

export const getAllBookingsController = async (req, res) => {
    try {
        const bookings = await getAllBookingsService();
        res.status(200).json({ success: true, data: bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getSingleBookingController = async (req, res) => {
    try {
        const booking = await getBookingByIdService(req.params.id);
        if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });
        res.status(200).json({ success: true, data: booking });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateBookingStatusController = async (req, res) => {
    try {
        const { status } = req.body;
        if (!["Pending", "Confirmed", "Completed"].includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid status value" });
        }

        const updatedBooking = await updateBookingStatusService(req.params.id, status);
        if (!updatedBooking) return res.status(404).json({ success: false, message: "Booking not found" });

        res.status(200).json({ success: true, message: "Booking status updated", data: updatedBooking });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteBookingController = async (req, res) => {
    try {
        const deletedBooking = await deleteBookingService(req.params.id);
        if (!deletedBooking) return res.status(404).json({ success: false, message: "Booking not found" });

        res.status(200).json({ success: true, message: "Booking deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
