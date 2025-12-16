import { Request, Response } from 'express';
import { TaskService } from '../services/task.service';
import { z } from 'zod';

// Zod Validation Schemas
const createTaskSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string(),
  dueDate: z.string().transform((str) => new Date(str)), // Convert string to Date
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']),
  status: z.enum(['TODO', 'IN_PROGRESS', 'REVIEW', 'COMPLETED']).optional(),
  assignedToId: z.string().optional()
});

const updateTaskSchema = createTaskSchema.partial(); // All fields optional for update

export class TaskController {
  
  static async create(req: Request, res: Response) {
    try {
      const validatedData = createTaskSchema.parse(req.body);
      // @ts-ignore (User is attached by middleware)
      const task = await TaskService.create(validatedData, req.user.id);
      res.status(201).json(task);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const filters = {
        status: req.query.status as string,
        priority: req.query.priority as string
      };
      const tasks = await TaskService.getAll(filters);
      res.json(tasks);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const validatedData = updateTaskSchema.parse(req.body);
      const task = await TaskService.update(req.params.id, validatedData);
      res.json(task);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      await TaskService.delete(req.params.id);
      res.json({ message: 'Task deleted' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}