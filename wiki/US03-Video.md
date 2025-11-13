# US-03 : Appels Vidéo

**En tant qu'** utilisateur,  
**Je veux** lancer des appels vidéo 1-on-1 ou en groupe,  
**Afin de** communiquer face-à-face avec mon équipe.

## Critères d'acceptation

- [x] CA-1 : Démarrage d'appels vidéo depuis un canal
- [x] CA-2 : Interface avec contrôles (mute, caméra, partage écran)
- [x] CA-3 : Appels de groupe (plusieurs participants)
- [x] CA-4 : Qualité vidéo HD stable
- [x] CA-5 : Notification d'invitation aux appels

## Métadonnées

| Attribut | Valeur |
|----------|--------|
| **Statut** | 🟢 Terminée |
| **Priorité** | Haute |
| **Responsable** | Senina Moumen |
| **Sprint** | Sprint 2 |
| **Story Points** | 8 |

## Fichiers Techniques

- `frontend/src/pages/CallPage.jsx` - Interface appel vidéo
- `frontend/src/lib/api.js` - API tokens Stream
- `backend/src/controllers/chat.controller.js` - Génération tokens

## Technologies

- **Stream Video SDK** : @stream-io/video-react-sdk (v1.19.2)
- **WebRTC** : Peer-to-peer via Stream SFU
- **Permissions** : Navigator.mediaDevices API
