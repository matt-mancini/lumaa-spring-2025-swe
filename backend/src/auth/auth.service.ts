import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

export async function registerUser(username: string, password: string) {
  // Check if user already exists
  const existingUser = await pool.query(
    'SELECT * FROM users WHERE username = $1',
    [username]
  );
  if (existingUser.rows.length > 0) {
    throw new Error('Username already taken');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert new user
  const result = await pool.query(
    `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username`,
    [username, hashedPassword]
  );

  return result.rows[0];
}

export async function loginUser(username: string, password: string) {
  // Check if user exists
  const user = await pool.query(
    'SELECT * FROM users WHERE username = $1',
    [username]
  );
  if (user.rows.length === 0) {
    throw new Error('Invalid credentials');
  }

  const userData = user.rows[0];

  // Compare passwords
  const match = await bcrypt.compare(password, userData.password);
  if (!match) {
    throw new Error('Invalid credentials');
  }

  // Generate JWT token
  const token = jwt.sign({ userId: userData.id }, JWT_SECRET, {
    expiresIn: '1h',
  });

  return token;
}
