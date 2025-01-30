# Hackathon 2025

## Table des matières

- [0. Groupe](#0-groupe)
- [1. Contexte](#1-contexte)
- [2. Architecture du site](#2-architecture-du-site)
- [3. Technologie](#3-technologie)
- [4. Fonctionnalités](#4-fonctionnalités)

## 0. Groupe.
 
Nous sommes le groupe **Bisons d'Amérique**. Le groupe est composé de 8 personnes dont une absence pour des raisons médicales.

Le groupe est composé de :

- **Hippolyte Lacour** : Chef d'équipe
- **Luca Straputicari** : Dev web en charge du Header, Footer, page d'accueil
- **Jordan Quivenros** : Dev web en charge du Header, Footer, page d'accueil
- **Mickael Fernandez** : Dev web en charge du chat
- **Tilian Hure** : Dev web en charge du chat
- **Kevin Rochetaing** : Dev web en charge des informations
- **Jorgelina Lodesma** : Dev web en charge des activités
 
 
## 1. Contexte.
 
En l'an **2180**, Toulouse est victime de nombreuses catastrophes naturelles. Dans l'optique de permettre aux habitants de récuperer des informations précises sur ces catastrophes, nous avons créé un site innovant.

### Objectifs :
- **Informer** les utilisateurs sur les catastrophes naturelles en fonction des zones.  
- **Favoriser la communication** via un système de chat en temps réel.  
- **Proposer des activités par zones**, car même en période de crise, il est important de conserver un lien social et de profiter de la vie ! 
 
## 2. Architecture du site.
 
L'organisation du projet est conçue pour optimiser la collaboration et faciliter les ajouts futurs.

```
Hackathon/ 
        ├── frontend/ 
        |          ├── general/ 
        │          |         ├── header/ 
        │          |         ├── footer/ 
        │          |         └── main/ 
        |          ├── activite/ 
        |          └── zones/ 
        |                  ├── chat/
        |                  └── infos/
        ├── backend/ 
        |          ├── api/
        |          |     ├── chat/ 
        |          |     └── info/
        |          |      
        |          └── config/
        ├── docker-compose.yml
        ├── dockerfile-apache
        ├── dockerfile-db
        ├── index.php
        ├── init.sql
        ├── mariadb-doc.md
        ├── README.adoc
        ├── README.md
        └── router.php
```
### Points forts de l'architecture :
- Chaque développeur peut avancer sur sa partie sans interférer avec celle des autres.  
- Ajout simplifié de nouvelles fonctionnalités grâce à une structure modulaire et claire.
 
## 3. Technologie.
 
### Choix technologiques :
Nous avons opté pour un site **entièrement frontend**, basé sur les contraintes suivantes :  

1. **Durée limitée du projet** : La gestion du temps est une priorité, nécessitant des solutions simples et rapides à implémenter.
2. **Ressources humaines** : Notre équipe étant composée principalement de développeurs web, nous avons optimisé nos choix pour leur permettre de travailler efficacement. 

### Gestion des données :
- Les données principales sont stockées dans une base de données MariaDB, ce qui assure une gestion centralisée et fiable des informations. 
- Pour des besoins plus simples (comme la gestion des utilisateurs), nous utilisons le **localStorage**, une solution rapide et adaptée pour stocker temporairement des données directement sur le navigateur.

### Langages utilisés :
- **HTML :** Pour la structure des pages.
- **CSS & Bootstrap :** Pour le design et une mise en page responsive.
- **JavaScript :** Pour l'interactivité et la logique côté client.
- **PHP :** Pour gérer les opérations backend et l'interaction avec la base de données.

## 4. Fonctionnalités.
 
Le site propose **trois fonctionnalités principales** :  

1. **Visualisation des informations** sur les catastrophes naturelles, triées par zone.  
2. **Chat en temps réel** pour échanger avec d'autres utilisateurs selon la zone sélectionnée.  
3. **Découverte d'activités** à faire dans les zones concernées.  

## 5. Structure de la Base de Données

La base contient trois tables :

1. **messages**
   - id (AUTO_INCREMENT)
   - author (VARCHAR)
   - text (TEXT)
   - time (DATETIME)

2. **info**
   - id (AUTO_INCREMENT)
   - nom (VARCHAR)
   - description (TEXT)
   - niveauDanger (VARCHAR)
   - type (VARCHAR)
   - date (DATETIME)
   - zone (INT)
   - intensite_valeur (DECIMAL)
   - intensite_unite (VARCHAR)

3. **activities**
   - id (AUTO_INCREMENT)
   - nom (VARCHAR)
   - type (VARCHAR)
   - description (TEXT)
   - dateEtHeure (DATETIME)
   - danger (VARCHAR)
   - nombreDeParticipants (INT)
   - zone (INT)



## 6 Déploiement : 

Voir README.adoc