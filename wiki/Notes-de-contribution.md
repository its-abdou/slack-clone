# Notes de Contribution

## Répartition du Travail

| Membre | Heures | Story Points | User Stories |
|--------|--------|--------------|--------------|
| Abdessamed Benaidja | 40h | 5 SP | US-01 |
| Habchi Abdennour | 45h | 8 SP | US-02 |
| Senina Moumen | 40h | 8 SP | US-03 |
| Faiz Bouziane | 45h | 8 SP | US-04 |
| **Total** | **170h** | **29 SP** | 4 US |

---

## Abdessamed Benaidja
**Rôle** : Owner & Frontend Developer

### Contributions (40h)

- **Architecture globale**
  - Setup initial repository
  - Structure monorepo (backend + frontend)
  - Configuration ESLint, Prettier

- **Authentification (US-01)**
  - Intégration Clerk SDK
  - Configuration OAuth (Google, GitHub)
  - Middleware backend `protectRoute`
  - AuthProvider React
  - Page AuthPage.jsx

- **Fichiers clés**
  - `backend/src/middleware/auth.middleware.js`
  - `backend/src/server.js`
  - `frontend/src/pages/AuthPage.jsx`
  - `frontend/src/providers/AuthProvider.jsx`

---

## Habchi Abdennour
**Rôle** : Frontend Developer

### Contributions (45h)

- **Interface utilisateur**
  - Composants React réutilisables
  - Design system avec TailwindCSS
  - Responsive design (mobile, tablet, desktop)

- **Canaux (US-02)**
  - CreateChannelModal
  - InviteModal
  - MembersModal
  - CustomChannelPreview
  - Intégration Stream Chat SDK

- **Fichiers clés**
  - `frontend/src/components/CreateChannelModal.jsx`
  - `frontend/src/components/InviteModal.jsx`
  - `frontend/src/components/MembersModal.jsx`
  - `frontend/src/pages/HomePage.jsx`

---

## Senina Moumen
**Rôle** : Backend Developer

### Contributions (40h)

- **Backend infrastructure**
  - Configuration Express.js
  - Connexion MongoDB Atlas
  - Routes API REST
  - Modèles Mongoose

- **Appels vidéo (US-03)**
  - Endpoint génération tokens Stream
  - Configuration Stream Video SDK
  - CallPage.jsx (frontend)
  - Gestion permissions WebRTC

- **Fichiers clés**
  - `backend/src/config/db.js`
  - `backend/src/config/stream.js`
  - `backend/src/controllers/chat.controller.js`
  - `frontend/src/pages/CallPage.jsx`

---

## Faiz Bouziane
**Rôle** : DevOps Engineer

### Contributions (45h)

- **Containerisation (US-04)**
  - Dockerfile backend (Node Alpine)
  - Dockerfile frontend (multi-stage + Nginx)
  - docker-compose.yml
  - Configuration Nginx

- **CI/CD**
  - GitHub Actions workflows (CI + CD)
  - Déploiement Google Cloud Run
  - Configuration Artifact Registry
  - Monitoring Sentry

- **Fichiers clés**
  - `backend/Dockerfile`
  - `frontend/Dockerfile`
  - `docker-compose.yml`
  - `.github/workflows/ci.yml`
  - `.github/workflows/cd.yml`

---

## Collaboration

### Outils utilisés
- **GitHub** : Gestion de code, PRs, Issues
- **Discord** : Communication quotidienne
- **Google Meet** : Réunions sprint

### Réunions
- **Daily Standups** : 15 min/jour
- **Sprint Planning** : 2h toutes les 2 semaines
- **Sprint Retro** : 1h toutes les 2 semaines

### Pull Requests
- **Total PRs** : 25
- **Taux d'approbation** : 100%
- **Temps moyen review** : 4h

---

## Reconnaissance

### 🏆 MVP
**Abdessamed Benaidja** - Vision produit et architecture solide

### 🎨 Best UI/UX
**Habchi Abdennour** - Interface utilisateur soignée

### 🔧 Best Backend
**Senina Moumen** - API robuste et scalable

### 🚀 DevOps Champion
**Faiz Bouziane** - Infrastructure cloud impeccable

---

## Remerciements

L'équipe remercie :
- **Stream** pour leur SDK excellente
- **Clerk** pour simplifier l'authentification
- **Google Cloud** pour la plateforme Cloud Run
- **Open Source Community** pour les packages NPM
