# 💬 Gestion de Projet : Slack Clone

Bienvenue dans la documentation complète du projet **Slack Clone** — une plateforme de collaboration en temps réel développée dans le cadre du **TP3 Prime** (gestion de projet technique).

Ce projet est une application full-stack moderne qui intègre messagerie instantanée, appels vidéo, partage de fichiers, sondages interactifs, et authentification sécurisée.

---

## 📋 Navigation Rapide

### 📖 Documentation Principale
- **[Présentation](Présentation)** — Vue d'ensemble du projet, objectifs, et équipe
- **[Architecture](Architecture)** — Stack technique, structure des dossiers, et flux de données
- **[User Story Template](User-Story-Template)** — Modèle réutilisable pour les User Stories

### 🚀 Gestion Agile
- **[User Stories](User-Stories)** — 6 User Stories détaillées avec critères d'acceptation
- **[Sprints](Sprints)** — Planification des 3 sprints du projet

### 📊 Analyses & Tests
- **[Veille](Veille)** — Analyse concurrentielle et tendances technologiques
- **[Tests](Tests)** — Scénarios de test et validation des fonctionnalités

### 🎯 Bilan & Contributions
- **[Bilan](Bilan)** — Synthèse, forces, défis et roadmap
- **[Contributions](Contributions)** — Répartition du travail par membre d'équipe

---

## 🎓 Contexte du Projet

**Formation** : TP3 Prime – Wiki orienté gestion de projet technique  
**Échéance** : Lundi 03/11/2025  
**Dépôt GitHub** : https://github.com/its-abdou/slack-clone

---

## 🛠️ Technologies Clés

| Catégorie | Technologies |
|-----------|-------------|
| **Frontend** | React.js, Vite, TailwindCSS |
| **Backend** | Node.js, Express.js |
| **Base de données** | MongoDB Atlas |
| **Authentification** | Clerk |
| **Temps réel** | Stream API, Socket.io |
| **Vidéo** | Stream Video SDK |
| **Monitoring** | Sentry |
| **Jobs asynchrones** | Inngest |
| **Conteneurisation** | Docker, Docker Compose |
| **CI/CD** | GitHub Actions |
| **Déploiement** | Google Cloud Run |

---

## 📦 Export PDF

Pour générer un document PDF complet de cette documentation, utilisez **Pandoc** :

```bash
cd wiki
pandoc Home.md Présentation.md Architecture.md User-Story-Template.md User-Stories.md Sprints.md Veille.md Tests.md Bilan.md Contributions.md -o TP3_Prime.pdf --toc
```

**Note** : Assurez-vous d'avoir Pandoc installé sur votre système :
```bash
sudo apt install pandoc  # Linux/WSL
brew install pandoc      # macOS
```

---

## 👥 Équipe de Développement

- **Abdou** (Product Owner) — Authentification & Canaux privés
- **Alice** (Développeuse Frontend) — Upload de fichiers & Sondages
- **Bob** (DevOps Engineer) — Appels vidéo & Déploiement Docker

---

## 🔗 Liens Utiles

- **Repository** : https://github.com/its-abdou/slack-clone
- **CI Pipeline** : https://github.com/its-abdou/slack-clone/actions
- **Issues** : https://github.com/its-abdou/slack-clone/issues

---

> **"Built for teams that value clarity, speed, and connection — a truly modern Slack experience."**
