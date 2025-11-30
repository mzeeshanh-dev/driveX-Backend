import Booking from "../models/booking.model.js";

export const createBookingService = async (bookingData) => {
    return await Booking.create(bookingData);
};

export const getAllBookingsService = async () => {
    return await Booking.find().sort({ createdAt: -1 });
};

export const getBookingByIdService = async (id) => {
    return await Booking.findById(id);
};

export const updateBookingStatusService = async (id, status) => {
    return await Booking.findByIdAndUpdate(id, { status }, { new: true });
};

export const deleteBookingService = async (id) => {
    return await Booking.findByIdAndDelete(id);
};
