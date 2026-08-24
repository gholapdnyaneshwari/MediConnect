import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";

const app = express();

const port = process.env.PORT || 4000;

// Database
connectDB();

// Cloudinary
connectCloudinary();

// Middlewares
app.use(cors());
app.use(express.json());

// Admin routes
app.use("/api/admin", adminRouter);

// Test API
app.get("/", (req, res) => {
    res.send("API WORKING");
});

// Start server
app.listen(port, () => {
    console.log("Server Started", port);
});