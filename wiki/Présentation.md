# 📋 Présentation du Projet

## Vue d'ensemble

**Slack Clone** est une plateforme de collaboration en temps réel développée avec la stack **MERN** (MongoDB, Express, React, Node.js), enrichie par des fonctionnalités avancées de communication d'équipe.

Le projet vise à fournir une alternative moderne à Slack, intégrant :
- 💬 Messagerie instantanée en temps réel
- 📹 Appels vidéo individuels et de groupe
- 📂 Partage de fichiers sécurisé
- 📊 Sondages interactifs
- 🔐 Authentification sécurisée avec Clerk
- 🐳 Déploiement containerisé via Docker

---

## 🎯 Objectifs du Projet

### Objectifs Fonctionnels
1. **Communication en temps réel** : Messagerie instantanée avec support des threads, réactions et messages épinglés
2. **Collaboration d'équipe** : Canaux publics et privés, messages directs
3. **Multimédia** : Partage de fichiers (images, PDFs, ZIPs), appels vidéo avec partage d'écran
4. **Engagement** : Sondages avec votes anonymes et suggestions des utilisateurs

### Objectifs Techniques
1. **Architecture scalable** : Séparation frontend/backend, microservices
2. **Performance** : Utilisation de Stream API pour la messagerie temps réel optimisée
3. **Sécurité** : Authentification JWT via Clerk, validation des données
4. **DevOps** : CI/CD automatisé, containerisation Docker, monitoring avec Sentry
5. **Qualité** : Tests automatisés, linting ESLint, revue de code avec CodeRabbit AI

---

## 👥 Équipe de Développement

| Membre | Rôle | Responsabilités principales |
|--------|------|---------------------------|
| **Abdou** | Product Owner & Full-Stack Dev | Authentification Clerk, canaux privés, architecture globale |
| **Alice** | Frontend Developer | Upload de fichiers, sondages interactifs, UI/UX |
| **Bob** | DevOps Engineer | Appels vidéo Stream SDK, Docker, CI/CD, déploiement Cloud |

---

## 🏗️ Diagramme d'Architecture Système

```
┌─────────────────────────────────────────────────────────────────┐
│                         UTILISATEURS                            │
│                    (Navigateurs Web)                            │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                      FRONTEND (React + Vite)                    │
│  ┌──────────────┬──────────────┬──────────────┬──────────────┐ │
│  │   HomePage   │   CallPage   │   AuthPage   │  Components  │ │
│  └──────────────┴──────────────┴──────────────┴──────────────┘ │
│        │               │               │               │        │
│        └───────────────┴───────────────┴───────────────┘        │
│                            │                                    │
│                    Stream Chat SDK                             │
│                    Stream Video SDK                            │
│                    Clerk React SDK                             │
└────────────────────────────┬───────────────────────────────────┘
                             │
                    HTTPS / WebSocket
                             │
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│                   BACKEND (Node.js + Express)                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              API Routes & Controllers                     │  │
│  │  • /api/chat/token     (Stream token generation)         │  │
│  │  • /api/inngest        (Background jobs)                  │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Middleware                                   │  │
│  │  • Clerk Authentication  • CORS  • Error Handler         │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────┬───────────────┬────────────────┬──────────────┘
                 │               │                │
                 ↓               ↓                ↓
┌─────────────────┐  ┌──────────────────┐  ┌────────────────┐
│   MongoDB Atlas │  │   Stream API     │  │   Clerk Auth   │
│   (Database)    │  │   (Chat/Video)   │  │   (Users)      │
└─────────────────┘  └──────────────────┘  └────────────────┘
         │                    │                    │
         └────────────────────┴────────────────────┘
                             │
                    ┌────────┴────────┐
                    │                 │
            ┌───────┴──────┐  ┌──────┴──────┐
            │   Sentry     │  │   Inngest   │
            │  (Monitoring)│  │  (Jobs)     │
            └──────────────┘  └─────────────┘
```

---

## 📊 Métriques du Projet

- **Lignes de code** : ~3000+ lignes (Backend + Frontend)
- **Fichiers sources** : 25+ fichiers JavaScript/JSX
- **Dépendances** : 30+ packages NPM
- **Tests** : Test suite Jest configurée
- **Temps de build** : ~2 minutes (frontend + backend)
- **Temps de déploiement** : ~5 minutes (CI/CD complet)

---

## 🌟 Fonctionnalités Principales

### 1. Messagerie Temps Réel
- Canaux publics et privés
- Messages directs (DM)
- Threads de discussion
- Réactions emoji
- Messages épinglés
- Notifications en temps réel

### 2. Appels Vidéo
- Appels 1-on-1
- Appels de groupe
- Partage d'écran
- Enregistrement des appels
- Réactions en temps réel pendant les appels

### 3. Gestion de Fichiers
- Upload drag-and-drop
- Support multi-formats (images, PDFs, ZIPs)
- Prévisualisation inline
- Validation de taille

### 4. Sondages Interactifs
- Création de sondages multi-options
- Mode anonyme
- Commentaires ouverts
- Suggestions des utilisateurs

### 5. Authentification & Sécurité
- Sign-in/Sign-up via Clerk
- OAuth (Google, GitHub)
- Protection des routes
- Tokens JWT sécurisés

---

## 🔗 Liens du Projet

- **Repository GitHub** : https://github.com/its-abdou/slack-clone
- **Backend Source** : https://github.com/its-abdou/slack-clone/tree/main/backend/src
- **Frontend Source** : https://github.com/its-abdou/slack-clone/tree/main/frontend/src
- **Docker Config** : https://github.com/its-abdou/slack-clone/blob/main/docker-compose.yml
- **CI Workflow** : https://github.com/its-abdou/slack-clone/blob/main/.github/workflows/ci.yml
- **CD Workflow** : https://github.com/its-abdou/slack-clone/blob/main/.github/workflows/cd.yml

---

> Retour à [Home](Home) | Suivant : [Architecture](Architecture)
