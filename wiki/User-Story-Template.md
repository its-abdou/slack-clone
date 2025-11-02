# 📝 User Story Template

Ce modèle standardisé est utilisé pour toutes les User Stories du projet. Il garantit une cohérence dans la documentation et facilite le suivi Agile.

---

## 🎯 Format Standard

### Structure de Base

```markdown
## US-XX : [Titre de la User Story]

**En tant que** [type d'utilisateur],  
**Je veux** [action/fonctionnalité souhaitée],  
**Afin de** [bénéfice/valeur métier].

---

### 📋 Critères d'acceptation

- [ ] **Critère 1** : Description détaillée du premier critère
- [ ] **Critère 2** : Description détaillée du deuxième critère
- [ ] **Critère 3** : Description détaillée du troisième critère
- [ ] **Critère 4** : Description détaillée du quatrième critère (si applicable)
- [ ] **Critère 5** : Description détaillée du cinquième critère (si applicable)

---

### 🎫 Métadonnées

| Attribut | Valeur |
|----------|--------|
| **Statut** | 🟢 Terminée / 🟡 En cours / 🔴 Bloquée / ⚪ À faire |
| **Priorité** | Haute / Moyenne / Basse |
| **Responsable** | Nom du développeur |
| **Sprint** | Sprint 1 / Sprint 2 / Sprint 3 |
| **Story Points** | 1-13 (Fibonacci) |

---

### 🔗 Liens GitHub

- **Fichiers modifiés** :
  - [`chemin/vers/fichier1.js`](https://github.com/its-abdou/slack-clone/blob/main/chemin/vers/fichier1.js)
  - [`chemin/vers/fichier2.jsx`](https://github.com/its-abdou/slack-clone/blob/main/chemin/vers/fichier2.jsx)

- **Commits principaux** :
  - [abc1234 - Description du commit](https://github.com/its-abdou/slack-clone/commit/abc1234)
  - [def5678 - Description du commit](https://github.com/its-abdou/slack-clone/commit/def5678)

---

### 📝 Notes techniques

[Ajoutez ici des notes sur l'implémentation, les choix techniques, les dépendances, etc.]

---
```

---

## 📌 Exemple Complet

```markdown
## US-01 : Authentification sécurisée via Clerk

**En tant qu'** utilisateur,  
**Je veux** me connecter de manière sécurisée avec mon compte Google ou GitHub,  
**Afin de** accéder aux fonctionnalités de la plateforme en toute sécurité.

---

### 📋 Critères d'acceptation

- [x] **CA-1** : L'utilisateur peut s'inscrire avec une adresse email
- [x] **CA-2** : L'utilisateur peut se connecter via OAuth (Google, GitHub)
- [x] **CA-3** : Un token JWT est généré et stocké de manière sécurisée
- [x] **CA-4** : Les routes protégées redirigent vers la page de connexion si non authentifié
- [x] **CA-5** : Le bouton de déconnexion fonctionne correctement

---

### 🎫 Métadonnées

| Attribut | Valeur |
|----------|--------|
| **Statut** | 🟢 Terminée |
| **Priorité** | Haute |
| **Responsable** | Abdou |
| **Sprint** | Sprint 1 |
| **Story Points** | 8 |

---

### 🔗 Liens GitHub

- **Fichiers modifiés** :
  - [`backend/src/middleware/auth.middleware.js`](https://github.com/its-abdou/slack-clone/blob/main/backend/src/middleware/auth.middleware.js)
  - [`frontend/src/pages/AuthPage.jsx`](https://github.com/its-abdou/slack-clone/blob/main/frontend/src/pages/AuthPage.jsx)
  - [`frontend/src/providers/AuthProvider.jsx`](https://github.com/its-abdou/slack-clone/blob/main/frontend/src/providers/AuthProvider.jsx)

- **Commits principaux** :
  - [cefccfa - Update CORS configuration](https://github.com/its-abdou/slack-clone/commit/cefccfa)

---

### 📝 Notes techniques

- **Librairie utilisée** : @clerk/clerk-react (v5.37.0) et @clerk/express (v1.7.4)
- **Sécurité** : Les tokens JWT sont vérifiés via middleware Express `protectRoute`
- **UX** : Redirection automatique après connexion réussie vers `/home`
- **Dépendance** : Clerk API keys stockées dans variables d'environnement

---
```

---

## ✅ Checklist de Validation

Avant de marquer une User Story comme terminée, vérifiez :

- [ ] Tous les critères d'acceptation sont cochés
- [ ] Le code est testé (tests unitaires/intégration si applicable)
- [ ] Le code est linté et validé (ESLint)
- [ ] Les commits sont liés à la User Story
- [ ] La documentation est mise à jour
- [ ] La démo a été validée par le Product Owner
- [ ] Aucune régression détectée

---

## 🔄 États possibles

| Icône | Statut | Description |
|-------|--------|-------------|
| ⚪ | **À faire** | User Story planifiée mais pas commencée |
| 🟡 | **En cours** | Développement actif |
| 🟠 | **En revue** | Code review en cours |
| 🔴 | **Bloquée** | Dépendances non résolues ou problèmes techniques |
| 🟢 | **Terminée** | Tous les CA validés et déployée |
| ⚫ | **Annulée** | User Story abandonnée (raison documentée) |

---

## 📚 Références

- **Méthodologie Agile** : Scrum Framework
- **Estimation** : Planning Poker avec suite de Fibonacci
- **Priorisation** : MoSCoW (Must, Should, Could, Won't)

---

> Retour à [Home](Home) | Suivant : [User Stories](User-Stories)
