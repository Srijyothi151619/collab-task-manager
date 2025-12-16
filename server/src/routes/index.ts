import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { TaskController } from '../controllers/task.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

// Auth
router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);
router.post('/auth/logout', AuthController.logout);
router.get('/auth/me', authenticateToken, AuthController.getMe);
router.get('/users', authenticateToken, async (req, res) => {
    // Quick endpoint to get users for the dropdown
    const prisma = require('../config/db').default;
    const users = await prisma.user.findMany({ select: { id: true, name: true } });
    res.json(users);
});

// Tasks
router.get('/tasks', authenticateToken, TaskController.getAll);
router.post('/tasks', authenticateToken, TaskController.create);
router.patch('/tasks/:id', authenticateToken, TaskController.update);
router.delete('/tasks/:id', authenticateToken, TaskController.delete);

export default router;