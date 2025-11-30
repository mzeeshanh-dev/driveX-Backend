import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    bookingId: {
        type: String,
        required: true,
        unique: true
    },
    carId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car", required: true
    },
    carName: {
        type: String,
        required: true
    },
    pricePerDay: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    pickupDate: {
        type: Date,
        required: true
    },
    dropoffDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Confirmed", "Completed"],
        default: "Pending"
    },
}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);
