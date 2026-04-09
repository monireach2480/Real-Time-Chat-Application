import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import path from "path";

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
const allowedOrigins = CLIENT_URL.split(",").map((origin) => origin.trim());
const requiredEnvVars = ["MONGODB_URI", "JWT_SECRET"];
const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error(`Missing required environment variables: ${missingEnvVars.join(", ")}`);
}

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.NODE_ENV === "development" ? "http://localhost:5173" : allowedOrigins,
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

if (process.env.NODE_ENV === "production" && !process.env.VERCEL) {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT, async () => {
  if (missingEnvVars.length > 0) {
    process.exit(1);
  }

  try {
    await connectDB();
    console.log("server is running on PORT:" + PORT);
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
});
