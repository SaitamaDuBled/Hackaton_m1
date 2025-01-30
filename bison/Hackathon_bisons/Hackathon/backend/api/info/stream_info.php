<?php
// Pour dire que c'est du JSON qu'on renvoie
header('Content-Type: application/json');

// Désactive le cache du navigateur pour toujours avoir les dernières données
header('Cache-Control: no-cache');

// On récupère la config de la BDD
require_once 'backend/config/config.php';

// IDs et zone par défaut = 0
$lastId = isset($_GET['last_id']) ? $_GET['last_id'] : 0;
$zone = isset($_GET['zone']) ? $_GET['zone'] : 0;

// Recherche des nouvelles infos depuis le dernier ID
$stmt = $conn->prepare("SELECT * FROM info WHERE id > $lastId and zone=$zone ORDER BY date DESC LIMIT 1");
$stmt->execute();
$result = $stmt->get_result();

if ($info = $result->fetch_assoc()) {
    echo json_encode([
        'hasNew' => true,
        'data' => $info
    ]);
} else {
    echo json_encode([
        'hasNew' => false,
        'data' => null
    ]);
}

$stmt->close();
$conn->close();