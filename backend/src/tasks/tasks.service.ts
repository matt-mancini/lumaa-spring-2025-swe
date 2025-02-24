import pool from '../db';

interface UpdateTaskData {
  title?: string;
  description?: string;
  isComplete?: boolean;
}

// Get tasks by userId
export async function getTasks(userId: number) {
  const result = await pool.query(
    'SELECT * FROM tasks WHERE user_id = $1',
    [userId]
  );
  return result.rows;
}

// Create a new task
export async function createTask(userId: number, title: string, description?: string) {
  const result = await pool.query(
    `INSERT INTO tasks (title, description, user_id) 
     VALUES ($1, $2, $3) 
     RETURNING id, title, description, is_complete, user_id`,
    [title, description, userId]
  );
  return result.rows[0];
}

// Update task
export async function updateTask(userId: number, taskId: number, data: UpdateTaskData) {
  const { title, description, isComplete } = data;
  const result = await pool.query(
    `UPDATE tasks 
     SET title = COALESCE($1, title), 
         description = COALESCE($2, description),
         is_complete = COALESCE($3, is_complete)
     WHERE id = $4 AND user_id = $5
     RETURNING id, title, description, is_complete, user_id`,
    [title, description, isComplete, taskId, userId]
  );
  
  if (result.rows.length === 0) {
    throw new Error('Task not found or not authorized');
  }

  return result.rows[0];
}

// Delete task
export async function deleteTask(userId: number, taskId: number) {
  const result = await pool.query(
    `DELETE FROM tasks 
     WHERE id = $1 AND user_id = $2
     RETURNING id`,
    [taskId, userId]
  );

  if (result.rows.length === 0) {
    throw new Error('Task not found or not authorized');
  }
}
