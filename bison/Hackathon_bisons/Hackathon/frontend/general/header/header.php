<?php
require_once 'backend/config/config.php';
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $titrePage ?? "Site prévention Toulouse"; ?></title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="/frontend/css/general.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootswatch@5.3.2/dist/solar/bootstrap.min.css">

    <!-- Inclure les fichiers CSS et JS dans le HTML -->
    <script src="https://kit.fontawesome.com/1f1ef13669.js" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <script src="frontend/general/header/javascript.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</head> 
<body>

<header>
<nav class="navbar navbar-expand-lg bg-dark px-5 py-3" data-bs-theme="dark">
  <div class="container-fluid">
    <a href="/#" class="px-4">
        <img src="/frontend/general/header/logoHome.png" alt="logo" class="img-fluid" style="width: 100px;">
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarColor02">
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <a class="nav-link active px-4" href="activites">Activité
            <span class="visually-hidden">(current)</span>
          </a>
        </li>
        <li class="nav-item dropdown">
          <!-- <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Zone</a> -->
          <button type="button" class="btn btn-secondary dropdown-toggle mx-4 px-4" data-bs-toggle="dropdown" aria-expanded="false">
                        Zone
                    </button>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="/zone?id=1">Zone 1</a>
            <a class="dropdown-item" href="/zone?id=2">Zone 2</a>
            <a class="dropdown-item" href="/zone?id=3">Zone 3</a>
            <a class="dropdown-item" href="/zone?id=4">Zone 4</a>
            <a class="dropdown-item" href="/zone?id=5">Zone 5</a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</nav>


</header>



<div id="alert-popup">
    <div id="alert-popup-content">
        <button id="alert-close">✕</button>
        <div class="alert-icons">
            <i class="fas fa-exclamation-triangle"></i>
            <i class="fas fa-bell"></i>
            <i class="fas fa-radiation"></i>
        </div>
        <h2 id="alert-title"></h2>
        <p id="alert-description"></p>
        <div class="preventive-message">
            <strong>Message préventif :</strong>
            <p id="alert-preventive-message"></p>
        </div>
    </div>
</div>

<div id="flash-container" class="flash-container">
    <div id="flash-content" class="flash-content"></div>
</div>

