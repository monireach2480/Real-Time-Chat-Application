import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
const allowedOrigins = CLIENT_URL.split(",").map((origin) => origin.trim());
const SOCKET_PATH =
  process.env.SOCKET_IO_PATH ||
  (process.env.NODE_ENV === "development" ? "/socket.io" : "/_/backend/socket.io");

const io = new Server(server, {
  path: SOCKET_PATH,
  cors: {
    origin: process.env.NODE_ENV === "development" ? ["http://localhost:5173"] : allowedOrigins,
    credentials: true,
  },
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// used to store online users
const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  // io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
