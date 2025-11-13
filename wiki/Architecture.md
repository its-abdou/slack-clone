# Architecture

## Stack Technique

| Catégorie | Technologie | Version |
|-----------|-------------|---------|
| **Frontend** | React | 19.1.1 |
| **Build Tool** | Vite | 7.1.7 |
| **Styling** | TailwindCSS | 4.1.16 |
| **Backend** | Express | 5.1.0 |
| **Runtime** | Node.js | 18.x |
| **Database** | MongoDB (Mongoose) | 8.16.5 |
| **Auth** | Clerk | 5.37.0 / 1.7.4 |
| **Chat** | Stream Chat | 9.14.0 / 8.60.0 |
| **Video** | Stream Video SDK | 1.19.2 |
| **Monitoring** | Sentry | 10.1.0 |
| **Jobs** | Inngest | 3.40.1 |
| **Container** | Docker | Latest |
| **CI/CD** | GitHub Actions | - |
| **Cloud** | Google Cloud Run | - |

## Structure du Projet

```
slack-clone/
├── backend/
│   ├── src/
│   │   ├── config/          # Configuration (DB, Stream, Inngest)
│   │   ├── controllers/     # Logique métier
│   │   ├── middleware/      # Auth middleware
│   │   ├── models/          # Schémas MongoDB
│   │   ├── routes/          # Routes API
│   │   └── server.js        # Point d'entrée
│   ├── tests/               # Tests Jest
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Composants React
│   │   ├── pages/           # Pages (Auth, Home, Call)
│   │   ├── providers/       # Context providers
│   │   ├── hooks/           # Custom hooks
│   │   └── lib/             # Utilitaires
│   └── Dockerfile
│
├── .github/workflows/       # CI/CD
└── docker-compose.yml
```

## Flux d'Authentification

```
User → Clerk Sign-In → JWT Token → Backend API → Stream Token → Chat/Video
```

## Flux de Messagerie

```
User A → Message → Stream API → WebSocket → User B (temps réel)
```

## Déploiement

- **Docker Compose** : Développement local
- **CI/CD** : GitHub Actions (tests + build)
- **Production** : Google Cloud Run (auto-scaling)

## Sécurité

- JWT tokens via Clerk
- CORS configuration stricte
- Variables d'environnement sécurisées
- Monitoring Sentry
