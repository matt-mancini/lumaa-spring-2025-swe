import { Router, Response } from 'express';
import { authMiddleware, AuthRequest } from '../middlewares/authMiddleware';
import { getTasks, createTask, updateTask, deleteTask } from './tasks.service';


const router = Router();

// Apply authMiddleware to all tasks routes
router.use(authMiddleware);

// GET /tasks
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const tasks = await getTasks(req.userId!);
    res.json(tasks);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// POST /tasks
router.post('/', async (req: AuthRequest, res: Response) => {
  try {
    const { title, description } = req.body;
    const newTask = await createTask(req.userId!, title, description);
    res.status(201).json(newTask);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// PUT /tasks/:id
router.put('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const taskId = parseInt(req.params.id, 10);
    const { title, description, isComplete } = req.body;
    const updatedTask = await updateTask(req.userId!, taskId, {
      title,
      description,
      isComplete,
    });
    res.json(updatedTask);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /tasks/:id
router.delete('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const taskId = parseInt(req.params.id, 10);
    await deleteTask(req.userId!, taskId);
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
