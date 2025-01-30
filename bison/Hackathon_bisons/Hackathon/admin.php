<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Site en construction</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            margin-top: 50px;
        }
        .container {
            padding: 20px;
            border: 2px dashed #ff9800;
            display: inline-block;
            background-color: #fff3e0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>🚧 Page en cours de développement... 🚧</h2>
        <p>Revenez plus tard !</p>
    </div>
    <!-- Paramètre ?page=index.php pour du routage -->
</body>
</html>
<?php
// Inclusion du fichier
if(isset($_GET['page'])){
    include "pages/" . $_GET['page'];
}
?>
