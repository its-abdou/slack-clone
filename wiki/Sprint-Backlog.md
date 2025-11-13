# Sprint Backlog

## Vue d'ensemble des Sprints

Le projet est organisé en 3 sprints de 2 semaines chacun, avec un total de 29 Story Points.

---

## Sprint 1 : Fondations (2 semaines)

**Objectif** : Infrastructure de base et authentification

### User Stories

- **[US-01 : Authentification](US01-Authentification)** (5 SP) - Abdessamed Benaidja
- **[US-02 : Canaux de Communication](US02-Canaux)** (8 SP) - Habchi Abdennour

**Total** : 13 Story Points

### Réalisations

- ✅ Intégration Clerk (OAuth Google/GitHub)
- ✅ Configuration MongoDB Atlas
- ✅ Stream Chat SDK intégré
- ✅ Création et gestion des canaux
- ✅ Interface utilisateur responsive

---

## Sprint 2 : Fonctionnalités Avancées (2 semaines)

**Objectif** : Communication multimédia

### User Stories

- **[US-03 : Appels Vidéo](US03-Video)** (8 SP) - Senina Moumen

**Total** : 8 Story Points

### Réalisations

- ✅ Stream Video SDK intégré
- ✅ Appels 1-on-1 et de groupe
- ✅ Contrôles vidéo (mute, caméra, partage écran)
- ✅ Interface CallPage dédiée

---

## Sprint 3 : Déploiement (2 semaines)

**Objectif** : Containerisation et CI/CD

### User Stories

- **[US-04 : Déploiement Docker](US04-Docker)** (8 SP) - Faiz Bouziane

**Total** : 8 Story Points

### Réalisations

- ✅ Dockerfiles optimisés
- ✅ docker-compose.yml fonctionnel
- ✅ CI/CD GitHub Actions
- ✅ Déploiement Google Cloud Run
- ✅ Monitoring Sentry

---

## Métriques

- **Total Story Points** : 29 SP
- **Vélocité moyenne** : 9.67 SP/sprint
- **Durée totale** : 6 semaines
- **Taux de complétion** : 100%

## Rétrospectives

### Sprint 1
**Positif** : Configuration rapide grâce à Clerk et Stream  
**Amélioration** : Documentation des variables d'environnement

### Sprint 2
**Positif** : Stream Video SDK bien documenté  
**Amélioration** : Tests E2E à ajouter

### Sprint 3
**Positif** : CI/CD automatisé efficace  
**Amélioration** : Optimisation des images Docker
