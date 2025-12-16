// server/src/routes/tasks.ts
import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// GET: Fetch all tasks from the Real Database
router.get('/', async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: 'desc' } // Show newest tasks first
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// POST: Create a new task
router.post('/', async (req, res) => {
  try {
    const { title, description, status, priority } = req.body;
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        status: status || 'To Do',
        priority: priority || 'Medium'
      }
    });
    res.json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

export default router;