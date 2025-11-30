import { getDashboardDataService } from "../services/dashboard.service.js";

export const getDashboardData = async (req, res) => {
    try {
        const data = await getDashboardDataService();
        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
