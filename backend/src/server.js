import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimitter.js";

import transactionsRoutes from "./routes/transactionsRoutes.js";
import job from "./config/cron.js";

dotenv.config();

const app = express();

if (process.env.NODE_ENV === "production") job.start();

app.use(express.json());
app.use(rateLimiter);

const PORT = process.env.PORT || 5001;

app.get("/api/health", (req, res) => {
    res.status(200).json({ message: "Server is running" });
})

app.use("/api/transactions", transactionsRoutes);

initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});