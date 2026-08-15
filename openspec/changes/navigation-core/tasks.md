## 1. Mobile — Structure de navigation

- [ ] 1.1 Barre de navigation principale (5 destinations : Carte, Fil, Créer, Messages, Profil)
- [ ] 1.2 Écran Fil avec toggle Events/Sessions, position mémorisée en local storage
- [ ] 1.3 Bouton/menu Créer contextuel : résolution des options disponibles selon les rôles du rider connecté
- [ ] 1.4 Section Gestion conditionnelle dans l'écran Profil (masquée si aucun rôle de gestion)

## 2. Coordination avec les autres changes

- [ ] 2.1 events-core : le fil d'events existant devient le mode "Events" du nouvel écran Fil, pas de changement de logique
- [ ] 2.2 sessions-core : brancher le fil de sessions comme mode "Sessions" du même écran
- [ ] 2.3 spot-core, shop-core : exposer les écrans de back-office existants (statut, édition, inscrits) depuis la section Gestion du profil
- [ ] 2.4 rider-social : exposer la file de validation super admin et la file de signalements depuis la section Gestion
- [ ] 2.5 rider-profile, rider-social : l'écran Profil regroupe identité (rider-profile), abonnements et fil d'activité (rider-social)

## 3. Design

- [ ] 3.1 Maquettes : bouton Créer en onglet vs bulle flottante (voir Open Questions, design.md)
- [ ] 3.2 Maquettes : pastille de notification sur l'onglet Messages (à confirmer)
