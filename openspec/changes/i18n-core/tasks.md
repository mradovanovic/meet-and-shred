## 1. Base de données

- [ ] 1.1 Ajouter le champ `language` (enum: fr | en | es, défaut: fr) sur la table `users`

## 2. Configs statiques

- [ ] 2.1 Mettre à jour le schéma des configs disciplines — `label` devient `{ fr, en, es }` sur tous les champs affichables
- [ ] 2.2 Mettre à jour le schéma des configs statuts de spot — idem
- [ ] 2.3 Mettre à jour le schéma `equipment_schema` des disciplines — labels de champs en `{ fr, en, es }`
- [ ] 2.4 Seeder / migrer les traductions EN et ES pour toutes les disciplines et statuts existants

## 3. API — Middleware de langue

- [ ] 3.1 Middleware de résolution de langue : profil user → Accept-Language → fr
- [ ] 3.2 Utilitaire `getLabel(multilingualObj, lang)` avec fallback FR
- [ ] 3.3 Appliquer la résolution sur tous les endpoints retournant des données statiques (disciplines, statuts, schémas matériel)

## 4. Mobile — i18next

- [ ] 4.1 Installer et configurer i18next + react-i18next pour Expo
- [ ] 4.2 Créer les fichiers `locales/fr.json`, `locales/en.json`, `locales/es.json`
- [ ] 4.3 Organiser les namespaces : `common`, `auth`, `profile`, `spots`, `events`, `notifications`
- [ ] 4.4 Remplacer toutes les strings hardcodées de l'app par des clés i18next
- [ ] 4.5 Écran de sélection de langue à l'inscription
- [ ] 4.6 Paramètre de changement de langue dans les paramètres du profil
