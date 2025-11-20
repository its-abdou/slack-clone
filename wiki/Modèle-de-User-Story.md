# Modèle de User Story

## Format Standard

```markdown
## US-XX : [Titre]

**En tant que** [rôle],  
**Je veux** [action],  
**Afin de** [bénéfice].

### Critères d'acceptation

- [ ] CA-1 : [Description]
- [ ] CA-2 : [Description]
- [ ] CA-3 : [Description]

### Métadonnées

| Attribut | Valeur |
|----------|--------|
| **Statut** | À faire / En cours / Terminée |
| **Priorité** | Haute / Moyenne / Basse |
| **Responsable** | [Nom] |
| **Sprint** | Sprint X |
| **Story Points** | [1-13] |

### Liens Techniques

- **Fichiers** : `chemin/vers/fichier.js`
- **Commits** : [hash - description](lien)

### Notes

[Détails techniques, dépendances, etc.]
```

## Exemple

```markdown
## US-01 : Authentification OAuth

**En tant qu'** utilisateur,  
**Je veux** me connecter avec Google/GitHub,  
**Afin de** accéder rapidement à la plateforme.

### Critères d'acceptation

- [x] CA-1 : Bouton "Sign in with Google" fonctionnel
- [x] CA-2 : Redirection après connexion réussie
- [x] CA-3 : Token JWT stocké sécurisé

### Métadonnées

| Attribut | Valeur |
|----------|--------|
| **Statut** | Terminée |
| **Priorité** | Haute |
| **Responsable** | Abdessamed Benaidja |
| **Sprint** | Sprint 1 |
| **Story Points** | 5 |
```
