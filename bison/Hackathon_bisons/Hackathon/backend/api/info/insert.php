<?php
// Pour dire que c'est du JSON qu'on renvoie
header('Content-Type: application/json');

// On récupère la config de la BDD
require_once 'backend/config/config.php';

// On vérifie que c'est bien une requête POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// On récupère les données envoyées
$data = json_decode(file_get_contents('php://input'), true);

// On vérifie que tous les champs obligatoires sont là
$required_fields = ['nom', 'niveauDanger', 'type', 'zone'];
foreach ($required_fields as $field) {
    if (!isset($data[$field])) {
        http_response_code(400);
        echo json_encode(['error' => "Missing required field: $field"]);
        exit;
    }
}

// On prépare les données pour la BDD
$nom = $data['nom'];
$description = $data['description'] ?? null; // Si pas de description, on met null
$niveauDanger = $data['niveauDanger'];
$type = $data['type'];
$zone = $data['zone'];
$intensite_valeur = $data['intensite_valeur'] ?? null;
$intensite_unite = $data['intensite_unite'] ?? null;

// La requête pour ajouter l'info
$sql = "INSERT INTO info (nom, description, niveauDanger, type, date, zone, intensite_valeur, intensite_unite)
        VALUES (?, ?, ?, ?, NOW(), ?, ?, ?)";

$stmt = $conn->prepare($sql);

// On lie les paramètres à la requête
$stmt->bind_param(
    "ssssdss",
    $nom,
    $description,
    $niveauDanger,
    $type,
    $zone,
    $intensite_valeur,
    $intensite_unite
);

// Si ça marche
if ($stmt->execute()) {
    $newId = $conn->insert_id;

    // On va chercher l'info qu'on vient d'ajouter
    $select = $conn->prepare("SELECT * FROM info WHERE id = ?");
    $select->bind_param("i", $newId);
    $select->execute();
    $result = $select->get_result();
    $newInfo = $result->fetch_assoc();

    http_response_code(201);
    echo json_encode([
        'message' => 'Info added successfully',
        'info' => $newInfo
    ]);
} else {
    // Si ça marche pas
    http_response_code(500);
    echo json_encode(['error' => 'Failed to add info']);
}

// On ferme tout proprement
$stmt->close();
$conn->close();
?>