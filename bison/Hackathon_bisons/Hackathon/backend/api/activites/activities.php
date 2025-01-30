<?php
require_once 'backend/config/config.php';

header('Content-Type: application/json');
header('Content-Type: application/json; charset=utf8');
$conn->set_charset("utf8");

$sql = "SELECT * FROM activities";
$result = $conn->query($sql);
# Récupération des données des activités et envoies en JSON
if ($result) {
    $messages = [];
    while ($row = $result->fetch_assoc()) {
        $messages[] = $row;
    }
    echo json_encode($messages);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to retrieve messages: ' . $conn->error]);
}

$conn->close();
?>