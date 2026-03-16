# NMIMS Student Portal

This is a full-stack student portal built with React (frontend) and Node.js/Express (backend).

## Prerequisites
- Node.js (v18+ recommended)
- npm (Node Package Manager)

## Project Structure
- `/student-portal-caf`: The React frontend application.
- `/student-portal-api`: The Node.js Express backend API.

## How to Run

You need to run both the backend and frontend servers simultaneously. The easiest way is to open two separate terminal windows.

### 1. Start the Backend API
Open your first terminal and run:
```bash
cd student-portal-api
npm install
npm start
```
*(The backend will start on http://localhost:5000)*

### 2. Start the Frontend
Open your second terminal and run:
```bash
cd student-portal-caf
npm install
npm start
```
*(The frontend will start on http://localhost:3000)*

## Login Credentials
The portal is protected. Use the following default credentials to log in:
- **Username:** `shaurya`
- **Password:** `password123`
