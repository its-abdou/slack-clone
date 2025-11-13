# US-02 : Canaux de Communication

**En tant que** membre d'équipe,  
**Je veux** créer et gérer des canaux publics/privés,  
**Afin de** organiser les discussions par thème.

## Critères d'acceptation

- [x] CA-1 : Création de canaux publics et privés
- [x] CA-2 : Invitation de membres aux canaux privés
- [x] CA-3 : Gestion des permissions (admin, membre)
- [x] CA-4 : Messages en temps réel dans les canaux
- [x] CA-5 : Navigation entre canaux fluide

## Métadonnées

| Attribut | Valeur |
|----------|--------|
| **Statut** | 🟢 Terminée |
| **Priorité** | Haute |
| **Responsable** | Habchi Abdennour |
| **Sprint** | Sprint 1 |
| **Story Points** | 8 |

## Fichiers Techniques

- `frontend/src/components/CreateChannelModal.jsx` - Création canal
- `frontend/src/components/InviteModal.jsx` - Invitations
- `frontend/src/components/MembersModal.jsx` - Gestion membres
- `frontend/src/pages/HomePage.jsx` - Interface principale
- `backend/src/config/stream.js` - Configuration Stream

## Technologies

- **Stream Chat** : stream-chat-react (v13.3.0)
- **UI** : TailwindCSS, Lucide Icons
