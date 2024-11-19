# Realtime Code Collaboration App

A **Realtime Code Collaboration App** built using **Socket.IO**, **React**, **TypeScript**, and **Node.js**, allowing users to create and join coding rooms to collaborate in real-time. This app enables multiple users to edit and share code simultaneously, enhancing the experience of working together on projects or learning collaboratively.

---

## Features

1. **Real-time Collaboration:**
   - Users can join rooms using a unique `roomId` and collaborate on code in real time.
   - Changes made by one user are instantly visible to others in the same room.

2. **Dynamic Room Management:**
   - Create new rooms or join existing ones seamlessly.
   - Each room has a unique identifier to keep user sessions organized.

3. **Robust Backend with Socket.IO:**
   - Real-time communication is handled through `Socket.IO` for low-latency interactions.

4. **TypeScript for Type Safety:**
   - The entire codebase is written in TypeScript for better type safety and maintainability.

5. **Frontend Built with React:**
   - A responsive and user-friendly interface created using React.

---

## Tech Stack

### **Frontend:**
- React
- TypeScript
- Vite (for development and build tooling)
- Socket.IO Client

### **Backend:**
- Node.js
- Express.js
- Socket.IO Server

### **Deployment:**
- Backend: **Railway**
- Frontend: **Vercel** (or any static hosting platform)

---

## How It Works

### **1. Creating a Room:**
- Users can create a room which generates a unique `roomId`.
- Once created, the app redirects the user to the room where they can start collaborating.

### **2. Joining a Room:**
- Users can join an existing room by entering its unique `roomId` in the "Join Room" screen.
- After joining, they will see the same editor and code being updated in real time.

### **3. Code Collaboration:**
- Users in the same room can collaboratively edit code.
- Changes are synchronized instantly using Socket.IO.

---

## Installation and Setup

Follow these steps to run the project locally:

### **Prerequisites:**
- Node.js and npm/yarn installed
- Railway or similar for backend deployment (optional)
- Vite for frontend development

---

### **1. Clone the Repository**

```bash
git clone https://github.com/your-username/your-repository.git
cd your-repository
