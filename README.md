# Task Management App

A simple application for creating and managing tasks, built with **React + TypeScript** (frontend), **Node.js** (backend), and **PostgreSQL** (database). Users can register, log in, and perform CRUD operations on tasks.

---

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Database Setup](#database-setup)
- [Environment Variables](#environment-variables)
- [Backend Setup & Run](#backend-setup--run)
- [Frontend Setup & Run](#frontend-setup--run)
- [Testing Notes](#testing-notes)
- [Salary Expectations](#salary-expectations)


---

## Features

- **User Authentication**: Register and log in users with JWT-based authentication.
- **Task Management**: Create new tasks, view existing tasks, update them (mark complete), or delete them.
- **Protected Routes**: Only authenticated users can access task endpoints.

---

## Prerequisites

- **Node.js** (v16+ recommended)
- **npm** (v8+ recommended)
- **PostgreSQL** (any recent version)

---

## Database Setup

1. **Install PostgreSQL** if you haven’t already.
2. **Create** a new database, for example:
   ```sql
   CREATE DATABASE task_manager;
   ```
3. **Run migrations** or manually create tables (`users`, `tasks`) if you have a SQL script:
   ```sql
   CREATE TABLE users (
       id SERIAL PRIMARY KEY,
       username VARCHAR(50) UNIQUE NOT NULL,
       password VARCHAR(200) NOT NULL
   );

   CREATE TABLE tasks (
       id SERIAL PRIMARY KEY,
       title VARCHAR(100) NOT NULL,
       description TEXT,
       is_complete BOOLEAN DEFAULT FALSE,
       user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
   );
   ```

---

## Environment Variables
1. Backend Environment Variables

   Create a file named `.env` in your **backend** folder with the following (adjust values as needed):
   
   ```
   PORT=4000
   DATABASE_URL=postgresql://<username>:<password>@localhost:5432/task_manager
   JWT_SECRET=SomeSuperSecretKey
   ```
   
   | Variable       | Description                                        |
   | -------------- | -------------------------------------------------- |
   | `PORT`         | The port for your backend server (default: 4000).  |
   | `DATABASE_URL` | PostgreSQL connection string.                      |
   | `JWT_SECRET`   | Secret key for signing/verifying JWT tokens.       |


2. Frontend Environment Variables (Create React App)

   If you’re using **Create React App**, you can set frontend environment variables in an `.env` file inside the `frontend/` folder. One common variable is the base URL for your backend API:
   
   ```
   REACT_APP_API_URL=http://localhost:4000
   ```
   
   > **Important**: By default, Create React App requires that all environment variables start with `REACT_APP_`. Any variable that doesn’t have this prefix will be ignored at build time.
   
   | Variable             | Example Value               | Description                                                                                                     |
   |----------------------|-----------------------------|-----------------------------------------------------------------------------------------------------------------|
   | **REACT_APP_API_URL** | `http://localhost:4000`     | The base URL for your backend server. The frontend will use this to make requests to `/auth`, `/tasks`, etc.    |
   
   ### Usage in Code
   
   In your React files, you can access `REACT_APP_API_URL` through:
   
   ```ts
   const apiUrl = process.env.REACT_APP_API_URL;
   // or 
   const apiUrl = import.meta.env.VITE_API_URL; // (If using Vite)
   ```
   
   *(Adjust accordingly if you’re using Vite or another build setup.)*

**Note**: Add `.env` to your `.gitignore` so you don’t commit sensitive credentials.

---

## Backend Setup & Run

1. **Navigate** to the backend folder:
   ```bash
   cd backend
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run** in development mode:
   ```bash
   npm run dev
   ```
   The server should start on [http://localhost:4000](http://localhost:4000).

If you have a build script for production, you could do:
```bash
npm run build
npm run start
```

---

## Frontend Setup & Run

1. **Navigate** to the frontend folder:
   ```bash
   cd frontend
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run** the development server:
   ```bash
   # If Create React App:
   npm start
   
   # If Vite:
   npm run dev
   ```
   By default, it should open at [http://localhost:3000](http://localhost:3000) (CRA) or [http://localhost:5173](http://localhost:5173) (Vite).

### Configuration

- If using Create React App, ensure you set `REACT_APP_API_URL` in `.env` (frontend) to point to your backend.  
- If using Vite, ensure you set `VITE_API_URL` in `.env` or in the code directly.

---

## Testing Notes

### Manual Testing

1. **Register** a new user at `/register`.
2. **Log In** to receive a JWT token, stored in `localStorage`.
3. **Manage Tasks**:
   - Create new tasks.
   - Mark tasks as complete or edit them.
   - Delete tasks as needed.
4. **Check** the database to ensure tasks link to the correct user.

---
## Salary Expectations
No Salary Expectations
