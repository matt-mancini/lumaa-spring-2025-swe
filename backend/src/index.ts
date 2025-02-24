import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './auth/auth.controller';
import taskRoutes from './tasks/tasks.controller';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
