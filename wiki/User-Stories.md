# 📚 User Stories

Ensemble des User Stories développées pour le projet Slack Clone, organisées par responsable et sprint.

---

## US-01 : Authentification sécurisée via Clerk

**En tant qu'** utilisateur,  
**Je veux** me connecter de manière sécurisée avec mon compte Google ou GitHub,  
**Afin de** accéder aux fonctionnalités de la plateforme et protéger mes données personnelles.

### 📋 Critères d'acceptation

- [x] **CA-1** : L'utilisateur peut s'inscrire avec une adresse email et un mot de passe
- [x] **CA-2** : L'utilisateur peut se connecter via OAuth (Google, GitHub)
- [x] **CA-3** : Un token JWT est généré côté backend et transmis au client
- [x] **CA-4** : Les routes protégées (`/api/chat/*`) vérifient le token via middleware
- [x] **CA-5** : Le bouton de déconnexion (`<UserButton />`) fonctionne et invalide la session
- [x] **CA-6** : Redirection automatique vers `/auth` si non authentifié

### 🎫 Métadonnées

| Attribut | Valeur |
|----------|--------|
| **Statut** | 🟢 Terminée |
| **Priorité** | Haute |
| **Responsable** | Abdou |
| **Sprint** | Sprint 1 |
| **Story Points** | 8 |

### 🔗 Liens GitHub

- **Fichiers modifiés** :
  - [`backend/src/middleware/auth.middleware.js`](https://github.com/its-abdou/slack-clone/blob/main/backend/src/middleware/auth.middleware.js) — Middleware de protection des routes
  - [`backend/src/server.js`](https://github.com/its-abdou/slack-clone/blob/main/backend/src/server.js) — Intégration Clerk Express middleware
  - [`frontend/src/pages/AuthPage.jsx`](https://github.com/its-abdou/slack-clone/blob/main/frontend/src/pages/AuthPage.jsx) — Page d'authentification
  - [`frontend/src/providers/AuthProvider.jsx`](https://github.com/its-abdou/slack-clone/blob/main/frontend/src/providers/AuthProvider.jsx) — Context Clerk React

- **Commits principaux** :
  - [cefccfa - Update CORS configuration](https://github.com/its-abdou/slack-clone/commit/cefccfa)

### 📝 Notes techniques

- **Librairie** : @clerk/clerk-react (v5.37.0) & @clerk/express (v1.7.4)
- **Flux** : Sign-in → Clerk API → JWT Cookie → Frontend redirect
- **Sécurité** : Tokens vérifiés via `clerkMiddleware()` et `protectRoute` custom middleware
- **Variables d'env** : `CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`

---

## US-02 : Création de canaux privés

**En tant que** membre d'une équipe,  
**Je veux** créer des canaux privés pour des discussions confidentielles,  
**Afin de** limiter l'accès aux informations sensibles à un groupe restreint.

### 📋 Critères d'acceptation

- [x] **CA-1** : Un bouton "Créer un canal" est disponible dans la sidebar
- [x] **CA-2** : Modal de création avec options : nom, description, type (public/privé)
- [x] **CA-3** : Les canaux privés n'apparaissent que pour les membres invités
- [x] **CA-4** : Le créateur peut inviter/retirer des membres via une interface dédiée
- [x] **CA-5** : Les messages dans les canaux privés ne sont pas visibles aux non-membres

### 🎫 Métadonnées

| Attribut | Valeur |
|----------|--------|
| **Statut** | 🟢 Terminée |
| **Priorité** | Haute |
| **Responsable** | Abdou |
| **Sprint** | Sprint 1 |
| **Story Points** | 13 |

### 🔗 Liens GitHub

- **Fichiers modifiés** :
  - [`frontend/src/components/CreateChannelModal.jsx`](https://github.com/its-abdou/slack-clone/blob/main/frontend/src/components/CreateChannelModal.jsx) — Modal de création
  - [`frontend/src/components/InviteModal.jsx`](https://github.com/its-abdou/slack-clone/blob/main/frontend/src/components/InviteModal.jsx) — Invitation de membres
  - [`frontend/src/components/MembersModal.jsx`](https://github.com/its-abdou/slack-clone/blob/main/frontend/src/components/MembersModal.jsx) — Gestion des membres
  - [`frontend/src/pages/HomePage.jsx`](https://github.com/its-abdou/slack-clone/blob/main/frontend/src/pages/HomePage.jsx) — Intégration UI
  - [`backend/src/config/stream.js`](https://github.com/its-abdou/slack-clone/blob/main/backend/src/config/stream.js) — Logique Stream API

- **Commits principaux** :
  - [cefccfa - Update CORS configuration](https://github.com/its-abdou/slack-clone/commit/cefccfa)

### 📝 Notes techniques

- **SDK** : Stream Chat React (`stream-chat-react` v13.3.0)
- **Permissions** : Configurées via Stream Dashboard (roles: admin, member)
- **Visibilité** : Filtre `discoverable: false` pour canaux privés
- **UI** : Lucide Icons (`PlusIcon`, `UsersIcon`) + TailwindCSS

---

## US-03 : Upload de fichiers multimédias

**En tant qu'** utilisateur,  
**Je veux** partager des fichiers (images, PDFs, ZIPs) dans les canaux,  
**Afin de** collaborer efficacement avec mon équipe.

### 📋 Critères d'acceptation

- [x] **CA-1** : Drag-and-drop de fichiers dans la zone de message
- [x] **CA-2** : Support des formats : images (PNG, JPG), PDFs, ZIPs, documents Office
- [x] **CA-3** : Validation de taille maximale (10 MB par fichier)
- [x] **CA-4** : Prévisualisation inline pour les images
- [x] **CA-5** : Lien de téléchargement pour les autres types de fichiers
- [x] **CA-6** : Affichage d'une barre de progression pendant l'upload

### 🎫 Métadonnées

| Attribut | Valeur |
|----------|--------|
| **Statut** | 🟢 Terminée |
| **Priorité** | Moyenne |
| **Responsable** | Alice |
| **Sprint** | Sprint 2 |
| **Story Points** | 5 |

### 🔗 Liens GitHub

- **Fichiers modifiés** :
  - [`frontend/src/pages/HomePage.jsx`](https://github.com/its-abdou/slack-clone/blob/main/frontend/src/pages/HomePage.jsx) — Intégration MessageInput
  - Stream SDK built-in file upload (via `<MessageInput />` component)

- **Commits principaux** :
  - [cefccfa - Update CORS configuration](https://github.com/its-abdou/slack-clone/commit/cefccfa)

### 📝 Notes techniques

- **Upload** : Géré automatiquement par Stream Chat SDK
- **Stockage** : Stream CDN (pas de backend custom nécessaire)
- **MIME types** : Validation côté client avant upload
- **UI** : Stream React components avec customisation CSS (`stream-chat-theme.css`)

---

## US-04 : Création de sondages interactifs

**En tant que** membre d'une équipe,  
**Je veux** créer des sondages avec options multiples,  
**Afin de** recueillir rapidement l'avis de mon équipe.

### 📋 Critères d'acceptation

- [x] **CA-1** : Bouton "Créer un sondage" dans l'interface de message
- [x] **CA-2** : Formulaire avec question + au moins 2 options (max 10)
- [x] **CA-3** : Option "Vote anonyme" activable
- [x] **CA-4** : Affichage des résultats en temps réel (graphique en barres)
- [x] **CA-5** : Les utilisateurs peuvent ajouter des commentaires sur le sondage
- [x] **CA-6** : Un seul vote par utilisateur (sauf si anonyme)

### 🎫 Métadonnées

| Attribut | Valeur |
|----------|--------|
| **Statut** | 🟢 Terminée |
| **Priorité** | Basse |
| **Responsable** | Alice |
| **Sprint** | Sprint 2 |
| **Story Points** | 8 |

### 🔗 Liens GitHub

- **Fichiers modifiés** :
  - [`frontend/src/components/CustomChannelHeader.jsx`](https://github.com/its-abdou/slack-clone/blob/main/frontend/src/components/CustomChannelHeader.jsx) — Bouton création sondage
  - Stream Polls feature (built-in via SDK)

- **Commits principaux** :
  - [cefccfa - Update CORS configuration](https://github.com/its-abdou/slack-clone/commit/cefccfa)

### 📝 Notes techniques

- **Implémentation** : Stream Chat Polls API (native feature)
- **Custom messages** : Type `poll` avec metadata JSON
- **Votes** : Stockés dans Stream backend, récupération via `channel.state.messages`
- **UI** : Custom React component wrapper autour de Stream Polls

---

## US-05 : Appels vidéo 1-on-1 et groupe

**En tant qu'** utilisateur,  
**Je veux** lancer des appels vidéo avec un ou plusieurs membres,  
**Afin de** communiquer face-à-face et partager mon écran.

### 📋 Critères d'acceptation

- [x] **CA-1** : Bouton "Démarrer un appel" visible dans le header du canal
- [x] **CA-2** : Notification push pour les participants invités
- [x] **CA-3** : Interface vidéo avec tuiles pour chaque participant
- [x] **CA-4** : Contrôles : mute micro, désactiver caméra, partage d'écran, raccrocher
- [x] **CA-5** : Réactions emoji en temps réel pendant l'appel
- [x] **CA-6** : Enregistrement de l'appel (option activable)

### 🎫 Métadonnées

| Attribut | Valeur |
|----------|--------|
| **Statut** | 🟢 Terminée |
| **Priorité** | Haute |
| **Responsable** | Bob |
| **Sprint** | Sprint 2 |
| **Story Points** | 13 |

### 🔗 Liens GitHub

- **Fichiers modifiés** :
  - [`frontend/src/pages/CallPage.jsx`](https://github.com/its-abdou/slack-clone/blob/main/frontend/src/pages/CallPage.jsx) — Page d'appel vidéo
  - [`frontend/src/lib/api.js`](https://github.com/its-abdou/slack-clone/blob/main/frontend/src/lib/api.js) — Fonction `getStreamToken()`
  - [`backend/src/controllers/chat.controller.js`](https://github.com/its-abdou/slack-clone/blob/main/backend/src/controllers/chat.controller.js) — Génération token Stream Video

- **Commits principaux** :
  - [cefccfa - Update CORS configuration](https://github.com/its-abdou/slack-clone/commit/cefccfa)

### 📝 Notes techniques

- **SDK** : @stream-io/video-react-sdk (v1.19.2)
- **WebRTC** : Peer-to-peer via Stream SFU (Selective Forwarding Unit)
- **Routing** : `/call/:id` avec useParams pour récupérer callId
- **Permissions** : Navigator.mediaDevices.getUserMedia pour accès caméra/micro
- **Composants** : `<StreamCall>`, `<SpeakerLayout>`, `<CallControls>`

---

## US-06 : Déploiement containerisé avec Docker

**En tant que** DevOps Engineer,  
**Je veux** containeriser l'application avec Docker,  
**Afin de** garantir un déploiement reproductible et scalable.

### 📋 Critères d'acceptation

- [x] **CA-1** : Dockerfile pour backend (Node.js Alpine)
- [x] **CA-2** : Dockerfile pour frontend (multi-stage: build + Nginx)
- [x] **CA-3** : docker-compose.yml orchestrant backend + frontend
- [x] **CA-4** : Variables d'environnement passées via .env files
- [x] **CA-5** : Réseau Docker interne pour communication backend ↔ frontend
- [x] **CA-6** : GitHub Actions workflow pour build & deploy sur Google Cloud Run

### 🎫 Métadonnées

| Attribut | Valeur |
|----------|--------|
| **Statut** | 🟢 Terminée |
| **Priorité** | Haute |
| **Responsable** | Bob |
| **Sprint** | Sprint 3 |
| **Story Points** | 13 |

### 🔗 Liens GitHub

- **Fichiers modifiés** :
  - [`docker-compose.yml`](https://github.com/its-abdou/slack-clone/blob/main/docker-compose.yml) — Orchestration multi-container
  - [`backend/Dockerfile`](https://github.com/its-abdou/slack-clone/blob/main/backend/Dockerfile) — Backend image
  - [`frontend/Dockerfile`](https://github.com/its-abdou/slack-clone/blob/main/frontend/Dockerfile) — Frontend image
  - [`frontend/nginx.conf`](https://github.com/its-abdou/slack-clone/blob/main/frontend/nginx.conf) — Reverse proxy config
  - [`.github/workflows/ci.yml`](https://github.com/its-abdou/slack-clone/blob/main/.github/workflows/ci.yml) — CI pipeline
  - [`.github/workflows/cd.yml`](https://github.com/its-abdou/slack-clone/blob/main/.github/workflows/cd.yml) — CD pipeline

- **Commits principaux** :
  - [cefccfa - Update CORS configuration](https://github.com/its-abdou/slack-clone/commit/cefccfa)

### 📝 Notes techniques

- **Base images** : node:18-alpine (backend), nginx:alpine (frontend)
- **Multi-stage build** : Optimisation taille image frontend (~50MB)
- **Ports** : Backend 5001, Frontend 80
- **Network** : Bridge network `app-network`
- **CI/CD** : 
  - CI déclenché sur PR/push (develop, feature/**)
  - CD déclenché sur push (main branch)
  - Déploiement sur Google Cloud Run avec Artifact Registry
- **Secrets** : Stockés dans GitHub Secrets, injectés dans Cloud Run env vars

---

## 📊 Vue d'ensemble

| ID | Titre | Responsable | Sprint | Story Points | Statut |
|----|-------|-------------|--------|--------------|--------|
| US-01 | Authentification Clerk | Abdou | Sprint 1 | 8 | 🟢 |
| US-02 | Canaux privés | Abdou | Sprint 1 | 13 | 🟢 |
| US-03 | Upload fichiers | Alice | Sprint 2 | 5 | 🟢 |
| US-04 | Sondages interactifs | Alice | Sprint 2 | 8 | 🟢 |
| US-05 | Appels vidéo | Bob | Sprint 2 | 13 | 🟢 |
| US-06 | Déploiement Docker | Bob | Sprint 3 | 13 | 🟢 |
| **Total** | | | | **60** | |

**Vélocité moyenne** : 20 story points / sprint

---

> Retour à [Home](Home) | Précédent : [User Story Template](User-Story-Template) | Suivant : [Sprints](Sprints)
