<?php
// Include de la configuration de la base de données
require_once 'backend/config/config.php';

// Header pour la reponse JSON et CORS
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Gestion des différentes méthodes HTTP
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'POST':
        // Gestion de l'envoi d'un nouveau message
        handleSendMessage($conn);
        break;
    case 'GET':
        // Gestion de la réception d'un nouveau message

        handleGetMessages($conn);
        break;
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method Not Allowed']);
        break;
}

function handleSendMessage($conn) {
    // Récupération des données POST
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    // Validation de l'input
    if (!isset($data['author']) || !isset($data['text'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing required fields']);
        return;
    }

    $author = $conn->real_escape_string($data['author']);
    $text = $conn->real_escape_string($data['text']);
    $time = date('Y-m-d H:i:s');

    // Préparation de la requête SQL pour insérer le message
    $sql = "INSERT INTO messages (author, text, time) VALUES ('$author', '$text', '$time')";
    
    if ($conn->query($sql)) {
        http_response_code(201);
        echo json_encode(['status' => 'Message sent successfully', 'id' => $conn->insert_id]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to send message: ' . $conn->error]);
    }
}

function handleGetMessages($conn) {
    // Optionnel: Ajouter de la pagination
    $limit = isset($_GET['limit']) ? $_GET['limit'] : 50;
    $offset = isset($_GET['offset']) ? $_GET['offset'] : 0;

    // Récupération des messages
    $sql = "SELECT * FROM messages ORDER BY time DESC LIMIT $limit OFFSET $offset";
    $result = $conn->query($sql);

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
}

// Fermeture de la connexion à la base de données
$conn->close();
?>