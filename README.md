# 💬 Slack Clone — Real-Time Team Collaboration Platform
![Demo App](/frontend/public/screenshot-for-readme.png)
A **modern Slack alternative** built with the **MERN stack**, designed for seamless communication, collaboration, and productivity.  
This project integrates real-time messaging, AI features, video conferencing, and secure authentication — all packed in a scalable architecture ready for production.

---

## 🚀 Highlights

- 💬 **Real-time Messaging** with threads, reactions, and pinned messages  
- 📂 **File Sharing** (Images, PDFs, ZIPs, and more)  
- 📊 **Interactive Polls** with multiple options, anonymous voting, and user suggestions  
- 🔐 **Clerk Authentication** for secure user management  
- 📨 **Direct Messages & Private Channels** for focused communication  
- 📹 **1-on-1 & Group Video Calls** with screen sharing and recording  
- 🎉 **Real-time Reactions** during calls  
- 🔧 **Background Jobs** powered by [Inngest](https://www.inngest.com/)  
- 🚨 **Production-grade Error Monitoring** using [Sentry](https://sentry.io/)  
- 🤖 **AI-powered Code Suggestions** with [CodeRabbit](https://coderabbit.ai/)  
- 🎯 Built with **scalable technologies** like [Stream](https://getstream.io/)  
- 🚀 **Free Deployment Setup** on Azure with GitHub Actions & Docker  
- ⏳ And much more!

---

## 🧩 Tech Stack

| Category | Technology |
|-----------|-------------|
| **Frontend** | React.js |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas |
| **Authentication** | Clerk |
| **Real-time** | Stream API, Socket.io |
| **Video Calls** | Stream Video SDK |
| **Error Monitoring** | Sentry |
| **Background Jobs** | Inngest |
| **Containerization** | Docker |
| **CI/CD** | GitHub Actions |
| **Hosting** | Azure Web App Services |

---

## 🏗️ Project Structure

```

slack-clone/
│
├── frontend/             # React app (UI)
│   ├── src/
│   └── .env
│
├── backend/              # Express API
│   ├── src/
│   └── .env
│
├── docker-compose.yml    # Container configuration
├── Dockerfile            # Base Docker setup
└── README.md

````

---

## ⚙️ Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/slack-clone.git
cd slack-clone
````

### 2️⃣ Configure Environment Variables

You’ll need two `.env` files — one for the frontend and one for the backend.

**Example: `backend/.env`**

```bash
MONGO_URI=your_mongodb_atlas_connection_string
STREAM_API_KEY=your_stream_api_key
CLERK_SECRET_KEY=your_clerk_secret_key
PORT=5000
```

**Example: `frontend/.env`**

```bash
VITE_STREAM_API_KEY=your_stream_api_key
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_BACKEND_URL=http://localhost:5000
```

### 3️⃣ Run with Docker

```bash
docker-compose up --build
```

The frontend will run on `http://localhost:5173`
The backend will run on `http://localhost:5000`

---

## 🧠 Features Breakdown

### 💬 Messaging

* Real-time sync across channels using Stream
* Threads for organized discussions
* Emoji reactions and pinned messages

### 📨 Direct & Private Chats

* Secure, private messaging
* Manage access roles and permissions

### 📂 File Sharing

* Upload and preview media, PDFs, ZIPs, etc.
* Drag-and-drop support with file size validation

### 📊 Polls

* Create polls with multiple options
* Enable anonymous mode or open comments

### 📹 Video Calls

* 1-on-1 and group calls powered by Stream Video
* Screen sharing, recording, and reactions in real time

### 🔧 Background Jobs

* Inngest handles async tasks for optimal performance

### 🚨 Error Monitoring

* Automatic logging and tracing via Sentry

### 🤖 AI Code Suggestions

* Integrated CodeRabbit bot for development feedback

---

## 🧰 Development Commands

Run the frontend and backend separately (for local dev):

```bash
# In one terminal
cd backend && npm run dev

# In another terminal
cd frontend && npm run dev
```

---

## 🧪 Testing

```bash
# Run backend tests
cd backend && npm test

# Run frontend tests
cd frontend && npm test
```

---

## 🐳 Deployment

This project is containerized with **Docker** and uses **GitHub Actions** for CI/CD.
It’s deployed on **Microsoft Azure**, connecting securely to **MongoDB Atlas**.

### Deployment Workflow

1. **CI Workflow** — runs tests and lints code on each push.
2. **CD Workflow** — builds and deploys Docker images to Azure Web Apps.
3. Environment secrets (MongoDB URI, Clerk keys, etc.) are stored in **GitHub Secrets** or **Azure App Settings**.

---


---

## 🧭 Roadmap

* [ ] Add workspace management
* [ ] Integrate voice channels
* [ ] Implement advanced search
* [ ] Add dark/light theme support
* [ ] Mobile-responsive improvements

---

## 🤝 Contributing

Pull requests are welcome!
For major changes, please open an issue first to discuss what you’d like to change.

---
* The open-source community ❤️

---

> **"Built for teams that value clarity, speed, and connection — a truly modern Slack experience."**

