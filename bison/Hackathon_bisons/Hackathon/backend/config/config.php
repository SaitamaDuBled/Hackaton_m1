<?php
    function loadEnv($path)
    {
        if (!file_exists($path)) {
            throw new Exception('.env file not found');
        }
    
        $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $line) {
            // Ignore les commentaires
            if (strpos(trim($line), '#') === 0) {
                continue;
            }
    
            // Sépare la clé et la valeur
            list($key, $value) = explode('=', $line, 2);
            $key = trim($key);
            $value = trim($value);
    
            // Définit les variables d'environnement
            putenv(sprintf('%s=%s', $key, $value));
        }
    }
    
    // Charger les variables d'environnement depuis le fichier .env
    loadEnv(__DIR__ . '/.env');
    
    // Récupérer les valeurs des variables d'environnement
    $servername = getenv('DB_SERVER');
    $username = getenv('DB_USERNAME');
    $password = getenv('DB_PASSWORD');
    $dbname = getenv('DB_NAME');
    $port = getenv('DB_PORT');
    
    // Connexion à la base de données
    $conn = new mysqli($servername, $username, $password, $dbname, $port);
    
    // Vérifier la connexion
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
?>