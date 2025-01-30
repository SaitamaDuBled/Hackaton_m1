# API Routes

Ce fichier contient les routes de l'API de `Toulouse Watch`. Les routes sont définies par des méthodes HTTP et des URL.
Considérant le temps du projet, le choix a été fait d'utiliser le moins de routes possible à défaut de pouvoir implémenter un système de sécurité plus complexe.

[GET] - params: zone (integer)
http://localhost:8081/chats/all

[POST] - body: tout les champs de la table Chat sauf id
http://localhost:8081/chats/add

[GET] - params: zone (integer)
http://localhost:8081/alert

[GET] - params: zone (integer)
http://localhost:8081/activity

[POST] - body: addData.txt
http://localhost:8081/addData
