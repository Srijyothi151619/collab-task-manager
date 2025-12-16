import prisma from '../config/db';
import { io } from '../app';

export class TaskService {
  
  static async create(data: any, userId: string) {
    const task = await prisma.task.create({
      data: {
        ...data,
        creatorId: userId,
        // If no assignee is selected, assign to self or leave null based on logic
        assignedToId: data.assignedToId || undefined
      },
      include: { assignee: true, creator: true }
    });

    // ⚡ REAL-TIME UPDATE: Notify everyone
    io.emit('task_update', task);
    
    return task;
  }

  static async getAll(filters: any) {
    const { status, priority } = filters;
    return await prisma.task.findMany({
      where: {
        ...(status && { status }),
        ...(priority && { priority })
      },
      include: { assignee: true, creator: true },
      orderBy: { dueDate: 'asc' }
    });
  }

  static async update(taskId: string, data: any) {
    const task = await prisma.task.update({
      where: { id: taskId },
      data,
      include: { assignee: true, creator: true }
    });

    // ⚡ REAL-TIME UPDATE
    io.emit('task_update', task);
    
    return task;
  }

  static async delete(taskId: string) {
    await prisma.task.delete({ where: { id: taskId } });
    io.emit('task_update', { id: taskId, deleted: true });
    return true;
  }
}