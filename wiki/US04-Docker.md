# US-04 : Déploiement Docker

**En tant que** DevOps,  
**Je veux** containeriser l'application avec Docker,  
**Afin de** garantir un déploiement reproductible et scalable.

## Critères d'acceptation

- [x] CA-1 : Dockerfile backend optimisé (Node Alpine)
- [x] CA-2 : Dockerfile frontend (multi-stage build + Nginx)
- [x] CA-3 : docker-compose.yml orchestrant les services
- [x] CA-4 : CI/CD avec GitHub Actions
- [x] CA-5 : Déploiement sur Google Cloud Run

## Métadonnées

| Attribut | Valeur |
|----------|--------|
| **Statut** | 🟢 Terminée |
| **Priorité** | Haute |
| **Responsable** | Faiz Bouziane |
| **Sprint** | Sprint 3 |
| **Story Points** | 8 |

## Fichiers Techniques

- `backend/Dockerfile` - Image backend
- `frontend/Dockerfile` - Image frontend
- `docker-compose.yml` - Orchestration
- `frontend/nginx.conf` - Configuration Nginx
- `.github/workflows/ci.yml` - Pipeline CI
- `.github/workflows/cd.yml` - Pipeline CD

## Technologies

- **Docker** : Multi-stage builds, Alpine Linux
- **CI/CD** : GitHub Actions
- **Cloud** : Google Cloud Run, Artifact Registry
