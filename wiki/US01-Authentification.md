# US-01 : Authentification Sécurisée

**En tant qu'** utilisateur,  
**Je veux** me connecter avec Google ou GitHub,  
**Afin de** accéder à la plateforme de manière sécurisée.

## Critères d'acceptation

- [x] CA-1 : Inscription avec email/mot de passe
- [x] CA-2 : Connexion OAuth (Google, GitHub)
- [x] CA-3 : Token JWT généré et stocké
- [x] CA-4 : Routes protégées avec middleware
- [x] CA-5 : Déconnexion fonctionnelle

## Métadonnées

| Attribut | Valeur |
|----------|--------|
| **Statut** | 🟢 Terminée |
| **Priorité** | Haute |
| **Responsable** | Abdessamed Benaidja |
| **Sprint** | Sprint 1 |
| **Story Points** | 5 |

## Fichiers Techniques

- `backend/src/middleware/auth.middleware.js` - Middleware auth
- `backend/src/server.js` - Intégration Clerk
- `frontend/src/pages/AuthPage.jsx` - Page authentification
- `frontend/src/providers/AuthProvider.jsx` - Context Clerk

## Technologies

- **Clerk** : @clerk/clerk-react (v5.37.0), @clerk/express (v1.7.4)
- **Sécurité** : JWT tokens, HTTPS, CORS
