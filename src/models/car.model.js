import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
    {
        carname: {
            type: String,
            required: true
        },
        brand: {
            type: String,
            required: true
        },
        pricePerDay: {
            type: Number,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        features: {
            type: [String],
            default: []
        },
        status: {
            type: String,
            enum: ["available", "rented", "maintenance"],
            required: true
        },
        image: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.model("Car", carSchema);
