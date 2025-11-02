# 🏃 Sprints

Planification et suivi des 3 sprints du projet Slack Clone.

---

## 📅 Planning Global

| Sprint | Durée | Dates | Objectif principal |
|--------|-------|-------|-------------------|
| **Sprint 1** | 2 semaines | 01/10 - 14/10/2025 | Authentification & Infrastructure de base |
| **Sprint 2** | 2 semaines | 15/10 - 28/10/2025 | Fonctionnalités collaboratives |
| **Sprint 3** | 1 semaine | 29/10 - 03/11/2025 | Déploiement & Documentation |

**Total** : 5 semaines  
**Vélocité moyenne** : 20 story points / sprint  
**Capacité totale** : 60 story points

---

## Sprint 1 : Fondations & Authentification

**Dates** : 01/10/2025 - 14/10/2025  
**Objectif** : Mettre en place l'architecture de base, l'authentification sécurisée, et la messagerie temps réel.

### 🎯 User Stories

- **[US-01 : Authentification sécurisée via Clerk](User-Stories#us-01--authentification-sécurisée-via-clerk)** (8 SP)
  - Responsable : Abdou
  - Statut : 🟢 Terminée

- **[US-02 : Création de canaux privés](User-Stories#us-02--création-de-canaux-privés)** (13 SP)
  - Responsable : Abdou
  - Statut : 🟢 Terminée

### 📊 Statistiques

| Métrique | Valeur |
|----------|--------|
| **Story Points planifiés** | 21 |
| **Story Points complétés** | 21 |
| **Taux de complétion** | 100% |
| **Vélocité** | 21 SP/sprint |

### 🎬 Résultats du Sprint

#### ✅ Réalisations
- ✅ Intégration complète de Clerk (OAuth Google/GitHub)
- ✅ Middleware de protection des routes backend
- ✅ AuthProvider React avec redirection automatique
- ✅ Création de canaux publics et privés via Stream API
- ✅ Système d'invitation et gestion des membres
- ✅ Interface utilisateur responsive avec TailwindCSS

#### 🏗️ Infrastructure mise en place
- MongoDB Atlas configuré et connecté
- Stream Chat SDK intégré (frontend + backend)
- Sentry configuré pour monitoring d'erreurs
- Inngest configuré pour background jobs
- ESLint + Prettier pour qualité de code

#### 🔗 Commits majeurs
- [cefccfa - Update CORS configuration](https://github.com/its-abdou/slack-clone/commit/cefccfa)
- Configuration initiale Clerk middleware
- Mise en place architecture frontend (pages, components, hooks)

### 📝 Rétrospective

**Ce qui a bien fonctionné :**
- La documentation Clerk est excellente, intégration fluide
- Stream API abstrait bien la complexité temps réel
- Pair programming efficace sur la gestion des canaux

**Défis rencontrés :**
- Configuration CORS complexe avec multiples origines
- Gestion des tokens Stream nécessitant endpoint backend dédié
- Tests d'intégration Clerk difficiles (mocking OAuth)

**Actions d'amélioration :**
- Documenter les variables d'environnement requises
- Créer un guide de setup pour nouveaux développeurs
- Automatiser la création des canaux de test

---

## Sprint 2 : Collaboration & Communication

**Dates** : 15/10/2025 - 28/10/2025  
**Objectif** : Ajouter les fonctionnalités de collaboration avancées (fichiers, sondages, vidéo).

### 🎯 User Stories

- **[US-03 : Upload de fichiers multimédias](User-Stories#us-03--upload-de-fichiers-multimédias)** (5 SP)
  - Responsable : Alice
  - Statut : 🟢 Terminée

- **[US-04 : Création de sondages interactifs](User-Stories#us-04--création-de-sondages-interactifs)** (8 SP)
  - Responsable : Alice
  - Statut : 🟢 Terminée

- **[US-05 : Appels vidéo 1-on-1 et groupe](User-Stories#us-05--appels-vidéo-1-on-1-et-groupe)** (13 SP)
  - Responsable : Bob
  - Statut : 🟢 Terminée

### 📊 Statistiques

| Métrique | Valeur |
|----------|--------|
| **Story Points planifiés** | 26 |
| **Story Points complétés** | 26 |
| **Taux de complétion** | 100% |
| **Vélocité** | 26 SP/sprint |

### 🎬 Résultats du Sprint

#### ✅ Réalisations
- ✅ Upload de fichiers drag-and-drop avec validation
- ✅ Prévisualisation images et liens de téléchargement
- ✅ Système de sondages avec votes en temps réel
- ✅ Interface d'appels vidéo avec Stream Video SDK
- ✅ Partage d'écran et réactions pendant les appels
- ✅ CallPage dédié avec routing dynamique

#### 🎨 Améliorations UI/UX
- CustomChannelHeader avec actions contextuelles
- PinnedMessagesModal pour messages importants
- Loading states et error boundaries
- Animations TailwindCSS pour modales

#### 🔗 Fichiers clés créés
- [`frontend/src/pages/CallPage.jsx`](https://github.com/its-abdou/slack-clone/blob/main/frontend/src/pages/CallPage.jsx)
- [`frontend/src/components/CustomChannelHeader.jsx`](https://github.com/its-abdou/slack-clone/blob/main/frontend/src/components/CustomChannelHeader.jsx)
- [`frontend/src/components/PinnedMessagesModal.jsx`](https://github.com/its-abdou/slack-clone/blob/main/frontend/src/components/PinnedMessagesModal.jsx)

### 📝 Rétrospective

**Ce qui a bien fonctionné :**
- Stream Video SDK très bien documenté
- Réutilisation des tokens Stream Chat pour Video (même API key)
- Collaboration Alice/Bob efficace sur l'UI des appels

**Défis rencontrés :**
- Permissions navigateur (camera/micro) complexes à gérer
- Latence vidéo sur certaines connexions (optimisation SFU nécessaire)
- Taille des fichiers uploadés à limiter (implémentation validation)

**Actions d'amélioration :**
- Ajouter tests E2E pour les appels vidéo
- Documenter les permissions requises
- Implémenter compression d'images côté client

---

## Sprint 3 : Déploiement & Finitions

**Dates** : 29/10/2025 - 03/11/2025  
**Objectif** : Containeriser, déployer en production, et finaliser la documentation.

### 🎯 User Stories

- **[US-06 : Déploiement containerisé avec Docker](User-Stories#us-06--déploiement-containerisé-avec-docker)** (13 SP)
  - Responsable : Bob
  - Statut : 🟢 Terminée

### 🎯 Tâches additionnelles (non User Stories)

- ✅ Création du Wiki GitHub complet (11 pages)
- ✅ README.md enrichi avec captures d'écran
- ✅ Configuration GitHub Actions CI/CD
- ✅ Tests automatisés backend (Jest)
- ✅ Build frontend optimisé (code splitting)
- ✅ Configuration Sentry production
- ✅ Monitoring Inngest dashboard

### 📊 Statistiques

| Métrique | Valeur |
|----------|--------|
| **Story Points planifiés** | 13 |
| **Story Points complétés** | 13 |
| **Taux de complétion** | 100% |
| **Vélocité** | 13 SP/sprint |

### 🎬 Résultats du Sprint

#### ✅ Réalisations DevOps
- ✅ Dockerfile backend (Node.js Alpine, production-ready)
- ✅ Dockerfile frontend (multi-stage build, Nginx)
- ✅ docker-compose.yml avec networking
- ✅ CI workflow : lint + test + build
- ✅ CD workflow : deploy to Google Cloud Run
- ✅ Artifact Registry configuré
- ✅ Secrets GitHub stockés de manière sécurisée

#### 📚 Documentation
- ✅ **Home.md** : Navigation et export PDF
- ✅ **Présentation.md** : Vue d'ensemble et équipe
- ✅ **Architecture.md** : Stack technique et diagrammes
- ✅ **User-Story-Template.md** : Modèle standardisé
- ✅ **User-Stories.md** : 6 US détaillées
- ✅ **Sprints.md** : Planification agile
- ✅ **Veille.md** : Analyse concurrentielle
- ✅ **Tests.md** : Scénarios et validations
- ✅ **Bilan.md** : Synthèse du projet
- ✅ **Contributions.md** : Répartition du travail

#### 🔗 Fichiers clés créés
- [`docker-compose.yml`](https://github.com/its-abdou/slack-clone/blob/main/docker-compose.yml)
- [`.github/workflows/ci.yml`](https://github.com/its-abdou/slack-clone/blob/main/.github/workflows/ci.yml)
- [`.github/workflows/cd.yml`](https://github.com/its-abdou/slack-clone/blob/main/.github/workflows/cd.yml)
- [`frontend/nginx.conf`](https://github.com/its-abdou/slack-clone/blob/main/frontend/nginx.conf)

### 📝 Rétrospective

**Ce qui a bien fonctionné :**
- Docker Compose simplifie drastiquement le setup local
- GitHub Actions workflows robustes et reproductibles
- Google Cloud Run déploiement quasi-instantané (serverless)
- Documentation Wiki complète et professionnelle

**Défis rencontrés :**
- Variables d'environnement multiples à gérer (dev/prod)
- Build ARG vs ENV dans Docker (frontend Vite)
- Cold start times sur Cloud Run (~3s)

**Actions futures :**
- Implémenter health checks pour Cloud Run
- Ajouter monitoring Prometheus/Grafana
- Optimiser images Docker (<100MB)
- Setup staging environment

---

## 📈 Burndown Chart (Textuel)

### Sprint 1
```
Story Points
21 │ ●
   │   ╲
   │     ╲
   │       ╲
   │         ╲
10 │           ●
   │             ╲
   │               ╲
 0 │_________________●________
   0   3   6   9   12  14 (jours)
```

### Sprint 2
```
Story Points
26 │ ●
   │   ╲
   │     ●
   │       ╲
15 │         ●
   │           ╲
   │             ╲
 0 │_______________●________
   0   3   7   11  14 (jours)
```

### Sprint 3
```
Story Points
13 │ ●
   │   ╲
   │     ╲
   │       ●
 5 │         ╲
   │           ●
 0 │_____________●_____
   0   2   4   6   7 (jours)
```

---

## 🎯 Vélocité de l'Équipe

| Sprint | Story Points Complétés | Jours | Vélocité |
|--------|----------------------|-------|----------|
| Sprint 1 | 21 | 14 | 1.5 SP/jour |
| Sprint 2 | 26 | 14 | 1.86 SP/jour |
| Sprint 3 | 13 | 7 | 1.86 SP/jour |
| **Moyenne** | **20** | **11.67** | **1.74 SP/jour** |

**Tendance** : Vélocité croissante, équipe mature en Sprint 2-3.

---

## 🔗 Liens Utiles

- **GitHub Projects** : https://github.com/its-abdou/slack-clone/projects
- **GitHub Actions** : https://github.com/its-abdou/slack-clone/actions
- **Cloud Run Console** : https://console.cloud.google.com/run

---

> Retour à [Home](Home) | Précédent : [User Stories](User-Stories) | Suivant : [Veille](Veille)
