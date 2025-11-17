import express from "express";
import cors from "cors";
import corsOptions from "./config/cors";
import eventListRoutes from "./api/v1/routes/eventListRoutes";
import featuredEventRoutes from "./api/v1/routes/featuredEventRoutes";
import categoryRoutes from "./api/v1/routes/categoryRoutes";

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
app.use("/api/v1/featured-events", featuredEventRoutes);
app.use("/api/v1/categories", categoryRoutes);

export default app;
