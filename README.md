# 🧠 Autism Support Chatroom App

A full-stack web application designed to provide a safe and inclusive space for autistic individuals to share their thoughts, experiences, or anything they feel like expressing.

> ⚠️ **Note:** This is a personal learning project built to practice and understand full-stack development, authentication, and session handling. It is **not production-ready**.

## PREVIEW: [Preview Site](https://autistic-club.vercel.app)

## 🔧 Tech Stack

- **Frontend:** React + Vite
- **Backend:** Express.js
- **Authentication:** Express Sessions with Cookies
- **Database:** PostgreSQL (PSQL)

## ✨ Features

### 🧑 User Functionality

- Register and log in using a **username and password**
- Become a **member of the club** upon successful registration
- Send, edit, and delete **your own messages**
- View messages from other users

### 🛡️ Admin Functionality

- Special **admin mode** with extended permissions
- **Delete messages** sent by any user (moderation tools)

## 🔐 Authentication & Session Management

- Authentication is handled using **Express Sessions**
- Sessions are **stored securely in PostgreSQL**
- Persistent sessions via **cookies**

## 💡 Purpose

This project was built to:

- Practice full-stack development
- Learn user authentication and session management
- Create a **simple but meaningful** chatroom to support the autistic community

## 🚀 Running Locally

```bash
# Clone the repository
git clone https://github.com/your-username/autism-chatroom-app.git
cd autism-chatroom-app

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install

# Start backend and frontend servers
# Make sure to set up PostgreSQL and environment variables properly
```

## 📝 License

✅ The updated file makes it clear this is a **learning project** and not meant for production use.  
Let me know if you want to include screenshots, a link to the repo, or setup instructions for the PostgreSQL session table.

This project is open-source and free to use under the [MIT License](LICENSE)
