// server/src/app.ts
import taskRoutes from './routes/tasks'; // You already had this, good!
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
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

// --- ADDED THIS LINE HERE ---
app.use('/api/tasks', taskRoutes); 
// ----------------------------

app.get('/', (req, res) => {
  res.send('Task Manager API is running');
});

export { httpServer, io, app }; // Export so server.ts can use it