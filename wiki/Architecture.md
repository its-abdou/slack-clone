# 🏗️ Architecture Technique

## Stack Technologique Complète

### Table des Technologies

| Catégorie | Technologie | Version | Usage |
|-----------|-------------|---------|-------|
| **Frontend Framework** | React.js | 19.1.1 | Interface utilisateur interactive |
| **Build Tool** | Vite | 7.1.7 | Build rapide et HMR |
| **Styling** | TailwindCSS | 4.1.16 | CSS utility-first |
| **State Management** | React Query | 5.83.0 | Gestion du cache et des requêtes |
| **Routing** | React Router | 7.6.3 | Navigation SPA |
| **Backend Framework** | Express.js | 5.1.0 | API REST |
| **Runtime** | Node.js | 18.x | Environnement d'exécution |
| **Database** | MongoDB | 8.16.5 (Mongoose) | Base de données NoSQL |
| **Authentication** | Clerk | 5.37.0 (React) / 1.7.4 (Express) | Authentification utilisateur |
| **Real-time Chat** | Stream Chat | 9.14.0 (Client) / 8.60.0 (Server) | Messagerie temps réel |
| **Video Calls** | Stream Video SDK | 1.19.2 | Appels vidéo P2P/groupe |
| **Background Jobs** | Inngest | 3.40.1 | Jobs asynchrones |
| **Error Monitoring** | Sentry | 10.1.0 | Tracking d'erreurs |
| **HTTP Client** | Axios | 1.11.0 | Requêtes HTTP |
| **UI Icons** | Lucide React | 0.539.0 | Icônes SVG |
| **Notifications** | React Hot Toast | 2.5.2 | Toasts UI |
| **Containerization** | Docker | Latest | Containerisation |
| **Orchestration** | Docker Compose | 3.8 | Multi-container |
| **CI/CD** | GitHub Actions | - | Intégration/déploiement continu |
| **Cloud Platform** | Google Cloud Run | - | Hosting serverless |
| **Testing** | Jest | 30.2.0 | Tests unitaires |
| **Testing** | Supertest | 7.1.4 | Tests API |

---

## 📁 Structure du Projet

```
slack-clone/
│
├── .github/
│   └── workflows/
│       ├── ci.yml                    # CI: Tests & build
│       └── cd.yml                    # CD: Deploy to Google Cloud Run
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js                # MongoDB connection
│   │   │   ├── env.js               # Environment variables
│   │   │   ├── inngest.js           # Inngest client & functions
│   │   │   └── stream.js            # Stream SDK initialization
│   │   │
│   │   ├── controllers/
│   │   │   └── chat.controller.js   # Stream token generation
│   │   │
│   │   ├── middleware/
│   │   │   └── auth.middleware.js   # Clerk authentication
│   │   │
│   │   ├── models/
│   │   │   └── user.model.js        # User schema
│   │   │
│   │   ├── routes/
│   │   │   └── chat.route.js        # Chat API routes
│   │   │
│   │   └── server.js                # Express app & startup
│   │
│   ├── tests/
│   │   └── app.test.js              # Backend tests
│   │
│   ├── Dockerfile                   # Backend container image
│   ├── package.json
│   └── .env                         # Environment variables (not tracked)
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CreateChannelModal.jsx
│   │   │   ├── CustomChannelHeader.jsx
│   │   │   ├── CustomChannelPreview.jsx
│   │   │   ├── InviteModal.jsx
│   │   │   ├── MembersModal.jsx
│   │   │   ├── PageLoader.jsx
│   │   │   ├── PinnedMessagesModal.jsx
│   │   │   └── UsersList.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── AuthPage.jsx         # Clerk authentication page
│   │   │   ├── CallPage.jsx         # Stream Video integration
│   │   │   └── HomePage.jsx         # Main chat interface
│   │   │
│   │   ├── providers/
│   │   │   └── AuthProvider.jsx     # Clerk context
│   │   │
│   │   ├── hooks/
│   │   │   └── useStreamChat.js     # Custom hook for Stream
│   │   │
│   │   ├── lib/
│   │   │   ├── api.js               # API functions
│   │   │   └── axios.js             # Axios instance
│   │   │
│   │   ├── styles/
│   │   │   └── stream-chat-theme.css
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── public/
│   │   └── screenshot-for-readme.png
│   │
│   ├── Dockerfile                   # Frontend container image
│   ├── nginx.conf                   # Nginx reverse proxy config
│   ├── vite.config.js
│   ├── eslint.config.js
│   ├── package.json
│   └── .env                         # Environment variables (not tracked)
│
├── docker-compose.yml               # Multi-container orchestration
├── README.md
├── .gitignore
└── .coderabbit.yml                  # CodeRabbit AI configuration
```

---

## 🔄 Flux de Données Temps Réel

### 1. Authentification Flow

```
User (Browser)
    │
    ├──> [Clerk Sign-In Widget]
    │         │
    │         ├──> POST /api/auth/sign-in (Clerk)
    │         │
    │         └──> JWT Token Generated
    │                   │
    │                   └──> Stored in Cookies/LocalStorage
    │
    └──> Frontend receives userId & session
              │
              ├──> GET /api/chat/token (Backend)
              │         │
              │         └──> Stream Token Generated (JWT)
              │
              └──> Stream Chat Client Initialized
```

### 2. Messagerie Temps Réel

```
User A                          Backend                      Stream API
  │                               │                              │
  ├─> Send Message ───────────────┤                              │
  │   (via Stream SDK)             │                              │
  │                                │─────> Webhook Event ────────>│
  │                                │       (message.new)          │
  │                                │                              │
  │                                │<───── Store in Stream DB ────┤
  │                                │                              │
  │<─── WebSocket Broadcast ───────────────────────────────────────┤
  │    (to all channel members)    │                              │
  │                                │                              │
User B receives notification       │                              │
  │                                │                              │
  └─> UI Updates (React State)    │                              │
```

### 3. Appels Vidéo

```
User A (Initiates Call)
    │
    ├──> Navigate to /call/:callId
    │         │
    │         ├──> Fetch Stream Token (GET /api/chat/token)
    │         │
    │         └──> Initialize StreamVideoClient
    │                   │
    │                   ├──> Create/Join Call (Stream API)
    │                   │
    │                   └──> WebRTC Connection Established
    │
User B (Receives Call)
    │
    ├──> Notification via Stream
    │         │
    │         └──> Navigate to /call/:callId
    │                   │
    │                   └──> Join Call (WebRTC P2P)
    │
Both Users Connected
    │
    ├──> Audio/Video Streams
    ├──> Screen Sharing
    ├──> Real-time Reactions
    └──> Call Recording (optional)
```

### 4. Background Jobs (Inngest)

```
Event Trigger                    Inngest Server              Function Handler
     │                                 │                           │
     ├──> User Created ───────────────>│                           │
     │    (Clerk Webhook)               │                           │
     │                                  │───> Queue Job ───────────>│
     │                                  │    (user.created)         │
     │                                  │                           │
     │                                  │                  ┌────────┴────────┐
     │                                  │                  │ • Upsert Stream │
     │                                  │                  │ • Add to Public │
     │                                  │                  │   Channels      │
     │                                  │                  └────────┬────────┘
     │                                  │<──── Job Complete ────────┤
     │<──── User Ready ─────────────────┤                           │
```

---

## 🐳 Architecture Docker

### docker-compose.yml

```yaml
services:
  backend:
    build: ./backend
    ports: ["5001:5001"]
    environment:
      - MONGO_URI
      - CLERK_SECRET_KEY
      - STREAM_API_KEY
      - STREAM_API_SECRET
    networks: [app-network]

  frontend:
    build: ./frontend
    ports: ["80:80"]
    depends_on: [backend]
    environment:
      - VITE_CLERK_PUBLISHABLE_KEY
      - VITE_STREAM_API_KEY
      - VITE_BACKEND_URL
    networks: [app-network]
```

### Dockerfile Backend

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
EXPOSE 5001
CMD ["node", "src/server.js"]
```

### Dockerfile Frontend

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG VITE_CLERK_PUBLISHABLE_KEY
ARG VITE_STREAM_API_KEY
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
```

---

## 🚀 Pipeline CI/CD

### CI Pipeline (`.github/workflows/ci.yml`)
```yaml
Trigger: Push/PR on develop, feature/**
Steps:
  1. Checkout code
  2. Setup Node.js 18
  3. Backend: npm install → lint → test
  4. Frontend: npm install → build
```

### CD Pipeline (`.github/workflows/cd.yml`)
```yaml
Trigger: Push on main branch
Steps:
  1. Authenticate Google Cloud
  2. Build Backend Docker Image
  3. Push to Artifact Registry
  4. Deploy to Cloud Run (Backend)
  5. Build Frontend Docker Image
  6. Push to Artifact Registry
  7. Deploy to Cloud Run (Frontend)
  8. Output deployment URLs
```

---

## 🔐 Sécurité

### Mesures Implémentées

1. **Authentification**
   - Clerk JWT tokens
   - Middleware `protectRoute` sur toutes les routes sensibles
   - Validation côté serveur

2. **CORS**
   - Whitelist des origines autorisées
   - Credentials: true pour cookies sécurisés

3. **Variables d'environnement**
   - Secrets stockés dans GitHub Secrets
   - Pas de hardcoding de credentials
   - Validation via `env.js`

4. **Error Monitoring**
   - Sentry pour tracking d'erreurs
   - PII (Personally Identifiable Information) excludedde logs

5. **Rate Limiting**
   - Stream API rate limits
   - Cloud Run auto-scaling

---

## 📊 Performance & Scalabilité

- **Horizontal Scaling** : Cloud Run auto-scale selon le trafic
- **CDN** : Assets statiques servis via Nginx
- **Lazy Loading** : Code splitting avec Vite
- **WebSocket** : Connexions persistantes pour temps réel
- **Database Indexing** : MongoDB indexes sur userId, channelId
- **Caching** : React Query cache côté client

---

## 🔗 Liens des Fichiers Clés

- **Server Entry** : [backend/src/server.js](https://github.com/its-abdou/slack-clone/blob/main/backend/src/server.js)
- **Auth Middleware** : [backend/src/middleware/auth.middleware.js](https://github.com/its-abdou/slack-clone/blob/main/backend/src/middleware/auth.middleware.js)
- **Stream Config** : [backend/src/config/stream.js](https://github.com/its-abdou/slack-clone/blob/main/backend/src/config/stream.js)
- **Home Page** : [frontend/src/pages/HomePage.jsx](https://github.com/its-abdou/slack-clone/blob/main/frontend/src/pages/HomePage.jsx)
- **Call Page** : [frontend/src/pages/CallPage.jsx](https://github.com/its-abdou/slack-clone/blob/main/frontend/src/pages/CallPage.jsx)
- **Docker Compose** : [docker-compose.yml](https://github.com/its-abdou/slack-clone/blob/main/docker-compose.yml)

---

> Retour à [Home](Home) | Précédent : [Présentation](Présentation) | Suivant : [User Stories](User-Stories)
