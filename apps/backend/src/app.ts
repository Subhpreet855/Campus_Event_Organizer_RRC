import express from "express";
import cors from "cors";
import corsOptions from "./config/cors";

const app = express();

// middleware
app.use(express.json());
app.use(cors(corsOptions));

// test route
app.get("/api/health", (_req, res) => {
  res.json({ message: "Backend is running" });
});

export default app;
