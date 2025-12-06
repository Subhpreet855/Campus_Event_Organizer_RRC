import express from "express";
import cors from "cors";
import corsOptions from "./config/cors";
import { clerkMiddleware } from "@clerk/express";

import eventListRoutes from "./api/v1/routes/eventListRoutes";
import featuredEventRoutes from "./api/v1/routes/featuredEventRoutes";
import categoryRoutes from "./api/v1/routes/categoryRoutes";

const app = express();

// middleware
app.use(clerkMiddleware());

// cors
app.use(express.json());
app.use(cors(corsOptions));

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ message: "Backend is running" });
});

// API Route groups
app.use("/api/v1", eventListRoutes);
app.use("/api/v1/featured-events", featuredEventRoutes);
app.use("/api/v1/categories", categoryRoutes);

export default app;
