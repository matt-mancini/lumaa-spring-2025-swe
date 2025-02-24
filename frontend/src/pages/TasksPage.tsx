import React, { useEffect, useState } from 'react';
import api from '../services/api';

interface Task {
  id: number;
  title: string;
  description?: string;
  is_complete: boolean;
}

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/tasks', { title, description });
      setTasks([...tasks, response.data]);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error(error);
    }
  };

  const toggleComplete = async (task: Task) => {
    try {
      const updated = await api.put(`/tasks/${task.id}`, {
        isComplete: !task.is_complete
      });
      setTasks(tasks.map(t => t.id === task.id ? updated.data : t));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (taskId: number) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter(t => t.id !== taskId));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container">
      <h2>Manage Tasks</h2>
      <form onSubmit={createTask}>
        <div className="form-group">
          <label>Title</label>
          <input
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Create Task</button>
      </form>
      <h3>Your Current Tasks</h3>
      <ul className="task-list">
        {tasks.map((task: any) => (
          <li key={task.id} className="task-item">
            <span
              className="task-title"
              style={{
                textDecoration: task.is_complete ? 'line-through' : 'none'
              }}
            >
              {task.title} - {task.description}
            </span>
            <input
              type="checkbox"
              checked={task.is_complete}
              onChange={() => toggleComplete(task)}
            />
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksPage;
