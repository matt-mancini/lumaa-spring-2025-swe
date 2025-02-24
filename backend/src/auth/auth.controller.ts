import { Router } from 'express';
import { registerUser, loginUser } from './auth.service';

const router = Router();

// POST /auth/register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body)
  try {
    const user = await registerUser(username, password);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// POST /auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const token = await loginUser(username, password);
    res.status(200).json({ token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
