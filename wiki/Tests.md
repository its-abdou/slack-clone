# Tests

## Stratégie de Test

### Types de Tests

- **Tests unitaires** : Jest (backend)
- **Tests d'intégration** : API routes
- **Tests E2E** : À implémenter (Playwright)
- **Tests manuels** : Scénarios fonctionnels

---

## Scénario 1 : Authentification et Navigation

### Objectif
Valider le flux complet d'authentification et de navigation entre canaux.

### Étapes

1. **Inscription**
   - Aller sur `/auth`
   - Cliquer "Sign up"
   - Utiliser OAuth GitHub
   - ✅ Redirection vers `/home`

2. **Navigation**
   - Vérifier la liste des canaux
   - Cliquer sur un canal
   - ✅ Messages chargés correctement

3. **Déconnexion**
   - Cliquer sur le bouton de déconnexion
   - ✅ Redirection vers `/auth`

### Résultat
✅ **SUCCÈS** - Tous les critères validés

---

## Scénario 2 : Appel Vidéo

### Objectif
Valider le fonctionnement des appels vidéo de groupe.

### Étapes

1. **Démarrage**
   - Depuis un canal, cliquer sur l'icône vidéo
   - Autoriser caméra/micro dans le navigateur
   - ✅ Redirection vers `/call/:id`

2. **Contrôles**
   - Tester mute/unmute micro
   - Tester activation/désactivation caméra
   - Tester partage d'écran
   - ✅ Tous les contrôles fonctionnent

3. **Multi-participants**
   - Inviter un autre utilisateur
   - ✅ Tuiles vidéo affichées correctement

### Résultat
✅ **SUCCÈS** - Qualité HD stable, latence <200ms

---

## Tests Automatisés

### Backend Tests (Jest)

```bash
cd backend
npm test
```

**Résultat** : ✅ 1/1 tests passés

### Frontend Build

```bash
cd frontend
npm run build
```

**Résultat** : ✅ Build réussi en ~45s

---

## CI/CD

### GitHub Actions

- **CI Pipeline** : Tests + Lint + Build
- **CD Pipeline** : Deploy to Cloud Run

**Statut** : ✅ Tous les checks passent

Voir : https://github.com/its-abdou/slack-clone/actions

---

## Métriques

- **Couverture tests backend** : 45%
- **Time to Interactive** : 2.8s
- **Lighthouse Score** : 85/100
- **Build time** : 45s (frontend)
