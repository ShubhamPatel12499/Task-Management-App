# Task-Management-App

This app helps you manage your tasks easily. You can add, view, edit, and delete tasks. It also offers convenient task management along with user authentication features for login and signup. The app is designed with a user-friendly interface, complete with a navigation bar and footer.

## Project Type
Fullstack 

## Deplolyed App
Frontend: https://6612e80800c5bff2af091c20--elaborate-stardust-6ea46e.netlify.app
Backend: https://task-management-backend-5wrr.onrender.com
Database: https://cloud.mongodb.com/v2/63b6f034b7479b13472cb383#/metrics/replicaSet/65ae0b29cc1b7c68af65999e/explorer/TaskManagementApp/tasks/find

## Directory Structure
Task-Management-App/
├─ Task-Management-Backend/
├─ Task-Management-Frontend/

## Video Walkthrough of the project and codebase
https://drive.google.com/file/d/11v6TFOik_LAc8zrEw3e2D6AGCKq60c20/view?usp=sharing

## Features
- Add Task 
- View Task
- Edit Task
- Delete Task
- Drag And Drop Task
- Download PDF for Particluar tasks Section
- Filter Tasks as per the Date
  
## Installation & Getting started
cd Task-Management-App
cd Task-Management-Frontend
npm install
npm start

## Usage
You can use this app for a Task Management.

## Credentials
You can create User from Signup Page.

## API Endpoints
GET /tasks/getTasks - Retrieve all Tasks
GET /tasks/:taskId - Get particular task
POST /tasks/addTask - create a new Task
PATCH /tasks/updateStatus/:taskId - Update the status of task while drag and drop (for update the status only)
PATCH /tasks/updateTask/:taskId - Update the Task (for update all data)
DELETE /tasks/delete/:taskId - Delete the Task
DOWNLOAD PDF /tasks/download/:status - Download Pdf
POST /users/login - Login the user
POST /users/register - Register the user

## Technology Stack
- Frontend - Reaxt.js
- Backend - Node.js
- Express.js
- DataBase - MongoDB

<h2>Add Task Page</h2>
<img src="https://github.com/ShubhamPatel12499/Task-Management-App/assets/98810944/9c645316-5d5f-4fc1-b7ff-4cc516069212"/>

<h2>View Task Page</h2>
<img src="https://github.com/ShubhamPatel12499/Task-Management-App/assets/98810944/78852a14-4147-4413-b863-7547d76a698f"/>

<h2>Login Page</h2>
<img src="https://github.com/ShubhamPatel12499/Task-Management-App/assets/98810944/0b836512-4090-409f-84df-66eb05d99f02"/>

<h2>Signup Page</h2>
<img src="https://github.com/ShubhamPatel12499/Task-Management-App/assets/98810944/154d665e-ca12-48f2-bedc-458390e23f28"/>

