Collaborative Task Manager
A full-stack task management application that allows users to create, view, update, and delete tasks in real-time. This project demonstrates a complete Full-Stack implementation with secure authentication and cloud deployment.
Live Demo
Frontend (Live App): [https://collab-task-manager-seven.vercel.app/](https://collab-task-manager-seven.vercel.app/)
Backend (API): [https://collab-task-manager-qcow.onrender.com](https://collab-task-manager-qcow.onrender.com)
Tech Stack
Frontend:React (Vite), TypeScript, Tailwind CSS
Backend:Node.js, Express.js, TypeScript
Database:MongoDB Atlas (Cloud)
Deployment:Vercel (Frontend) & Render (Backend)
Features
User Authentication:Secure Login and Registration system.
Task Management:
  - Create new tasks with titles and descriptions.
  - View a list of all tasks.
  - Delete completed tasks.
Responsive Design: Works seamlessly on desktop and mobile.
Real-Time API:RESTful API endpoints connected to a cloud database.
CORS Configuration:Secure communication between Vercel and Render.
Installation & Setup
If you want to run this project locally, follow these steps:
1. Clone the Repository
bash
git clone [https://github.com/Srijyothi151619/collab-task-manager.git](https://github.com/Srijyothi151619/collab-task-manager.git)
cd collab-task-manager
Backend Setup
cd server
npm install
Create a .env file in the server folder and add your credentials:
PORT=5000
DATABASE_URL="your_mongodb_connection_string"
JWT_SECRET="your_secret_key"
Here is the complete text block for your README.md file.

I have already filled in your correct links and name, so you don't need to change anything. Just Copy the code below and Paste it into the file on GitHub.

Markdown

# 📋 Collaborative Task Manager

A full-stack task management application that allows users to create, view, update, and delete tasks in real-time. This project demonstrates a complete Full-Stack implementation with secure authentication and cloud deployment.

## 🚀 Live Demo

- **Frontend (Live App):** [https://collab-task-manager-seven.vercel.app/](https://collab-task-manager-seven.vercel.app/)
- **Backend (API):** [https://collab-task-manager-qcow.onrender.com](https://collab-task-manager-qcow.onrender.com)

---

## 🛠️ Tech Stack

- **Frontend:** React (Vite), TypeScript, Tailwind CSS
- **Backend:** Node.js, Express.js, TypeScript
- **Database:** MongoDB Atlas (Cloud)
- **Deployment:** Vercel (Frontend) & Render (Backend)

---

## ✨ Features

- **User Authentication:** Secure Login and Registration system.
- **Task Management:**
  - Create new tasks with titles and descriptions.
  - View a list of all tasks.
  - Delete completed tasks.
- **Responsive Design:** Works seamlessly on desktop and mobile.
- **Real-Time API:** RESTful API endpoints connected to a cloud database.
- **CORS Configuration:** Secure communication between Vercel and Render.

---

## ⚙️ Installation & Setup

If you want to run this project locally, follow these steps:

### 1. Clone the Repository
```bash
git clone [https://github.com/Srijyothi151619/collab-task-manager.git](https://github.com/Srijyothi151619/collab-task-manager.git)
cd collab-task-manager
2. Backend Setup
Bash

cd server
npm install
Create a .env file in the server folder and add your credentials:

Code snippet

PORT=5000
DATABASE_URL="your_mongodb_connection_string"
JWT_SECRET="your_secret_key"
Start the server:
npm start
3. Frontend Setup
cd ../client
npm install
Start the client:
npm run dev
collab-task-manager/
├── client/           # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.tsx
├── server/           # Node.js Backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   └── index.ts
└── README.md

Method,Endpoint,Description
POST,/api/auth/register,Register a new user
POST,/api/auth/login,Login user
GET,/api/tasks,Get all tasks
POST,/api/tasks,Create a new task
DELETE,/api/tasks/:id,Delete a task
Thank you 
