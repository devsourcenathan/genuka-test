# Task Management Application

## Description

Ce projet est une application de gestion des tâches, construite avec **Next.js**. Il permet à l'utilisateur de gérer des tâches, de les filtrer selon leur statut (ouvertes, fermées, archivées) et de créer de nouvelles tâches. Les tâches sont stockées localement via `localStorage` et sont récupérées au chargement de l'application.

## Fonctionnalités

- **Gestion des tâches** : Les utilisateurs peuvent créer des tâches avec un titre, un projet, une date, une heure de début et une heure de fin.
- **Filtrage des tâches** : Les utilisateurs peuvent filtrer les tâches selon leur statut :
  - **Toutes** : Affiche toutes les tâches (sauf celles archivées).
  - **Ouvertes** : Affiche les tâches dont le statut est "ouvert".
  - **Fermées** : Affiche les tâches dont le statut est "complété".
  - **Archivées** : Affiche les tâches archivées.
- **Ajout de tâches** : Une modal permet de créer de nouvelles tâches et de les ajouter à la liste.
- **Stockage local** : Les tâches sont stockées dans le `localStorage` du navigateur, permettant de conserver l'état des tâches entre les sessions.

## Technologies

- **Next.js** : Utilisé pour créer l'application avec une approche server-side rendering (SSR).
- **React** : Pour la gestion de l'interface utilisateur et des états (avec `useState` et `useEffect`).
- **TailwindCSS** : Utilisé pour le style et les animations fluides (comme les transitions de survol et les animations de fade-in).
- **TypeScript** : Pour assurer la sécurité des types et une meilleure maintenabilité du code.

## Structure des composants

- **`TaskList`** : Le composant principal qui affiche la liste des tâches avec la possibilité de les filtrer. Il gère également l'ouverture de la modal de création de tâches.
- **`TaskItem`** : Composant qui représente une tâche individuelle. Il affiche les informations de la tâche et permet d'interagir avec elle (par exemple, marquer une tâche comme terminée).
- **`FilterButton`** : Composant pour chaque bouton de filtre qui permet de filtrer les tâches par statut.
- **`CreateTask`** : Modal pour la création d'une nouvelle tâche. Permet de saisir toutes les informations nécessaires pour ajouter une tâche.
- **`localStorageTasks`** : Utilitaire pour interagir avec le `localStorage` afin de récupérer et d'ajouter des tâches.

## Installation

```bash
npm install

npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
