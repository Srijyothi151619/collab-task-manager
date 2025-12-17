// server/src/app.ts
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
const httpServer = createServer(app);

// define allowed origins (Localhost AND Vercel)
const allowedOrigins = [
  "http://localhost:5173",
  "https://collab-task-manager-seven.vercel.app"
];

// Configure Socket.io CORS
const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"]
  }
});

// Configure Express CORS
app.use(cors({
  origin: allowedOrigins,
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