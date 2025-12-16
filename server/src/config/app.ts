// server/src/app.ts
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
const httpServer = createServer(app);

// Configure CORS for frontend connection
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"]
  }
});

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Test Route
app.get('/', (req, res) => {
  res.send('Task Manager API is running');
});

// Export for use in other files
export { app, httpServer, io };