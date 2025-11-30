import Car from "../models/car.model.js";
import Booking from "../models/booking.model.js";

export const getDashboardDataService = async () => {
    const totalCars = await Car.countDocuments();
    const activeBookings = await Booking.countDocuments({ status: "Confirmed" });
    const revenueBookings = await Booking.find({ status: { $in: ["Confirmed", "Completed"] } });
    const totalRevenue = revenueBookings.reduce((sum, booking) => sum + booking.totalPrice, 0);
    const pendingRequests = await Booking.countDocuments({ status: "Pending" });

    return {
        totalCars,
        activeBookings,
        totalRevenue,
        pendingRequests,
    };
};
