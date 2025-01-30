<?php
// Pour dire que c'est du JSON qu'on renvoie
header('Content-Type: application/json');

// On récupère la config de la BDD
require_once 'backend/config/config.php';

try {
    // La requête pour chopper les 20 dernières infos
    $stmt = $conn->prepare("
        SELECT 
            id, 
            nom, 
            description, 
            niveauDanger AS niveau, 
            type, 
            date, 
            zone, 
            intensite_valeur, 
            intensite_unite
        FROM info 
        ORDER BY date DESC 
        LIMIT 20
    ");

    // On exécute la requête
    $stmt->execute();
    $result = $stmt->get_result();

    // On récupère tout dans un tableau
    $flashInfos = $result->fetch_all(MYSQLI_ASSOC);

    // On transforme en JSON et on envoie
    echo json_encode(['flash_infos' => $flashInfos]);

} catch(Exception $e) {
    // Si ça plante, on envoie une erreur 500
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>