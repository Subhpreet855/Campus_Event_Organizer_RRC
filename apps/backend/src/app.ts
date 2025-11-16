import express from "express";
import cors from "cors";
import corsOptions from "./config/cors";
import eventListRoutes from "./api/v1/routes/eventListRoutes";

const app = express();

// Middleware
app.use(express.json());
app.use(cors(corsOptions));

// Health check route
app.get("/api/health", (_req, res) => {
  res.json({ message: "Backend is running" });
});

// API routes
app.use("/api/v1", eventListRoutes);

export default app;
