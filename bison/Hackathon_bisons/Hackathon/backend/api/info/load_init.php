<?php
// Pour dire que c'est du JSON qu'on renvoie
header('Content-Type: application/json');

// On récupère la config de la BDD
require_once 'backend/config/config.php';

// Zone par défaut = 0
$zone = isset($_GET['zone']) ? $_GET['zone'] : 0;

$stmt = $conn->prepare("SELECT * FROM info WHERE zone=$zone ORDER BY date DESC LIMIT 50");

// On récupère les dernières infos de la zone
if ($stmt->execute()) {
    $result = $stmt->get_result();
    $infos = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($infos);
} else {
    // Si erreur
    http_response_code(500);
    echo json_encode(['error' => 'Failed to retrieve info']);
}

// On ferme les connexions
$stmt->close();
$conn->close();
?>