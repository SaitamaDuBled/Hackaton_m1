<?php
require_once 'backend/config/config.php';

header('Content-Type: application/json; charset=utf8');
#Modification du nombre de participant en base de données
$sql = "SELECT nombreDeParticipants FROM activities WHERE id = ?";
if ($stmt = $conn->prepare($sql)) {
    $stmt->bind_param("i", $_POST['id']);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        $newCount = $row['nombreDeParticipants'] + ($_POST['action'] === 'increment' ? 1 : -1);
        $newCount = max(0, $newCount);

        $updateSql = "UPDATE activities SET nombreDeParticipants = ? WHERE id = ?";
        $updateStmt = $conn->prepare($updateSql);
        $updateStmt->bind_param("ii", $newCount, $_POST['id']);
        $updateStmt->execute();

        echo json_encode(['success' => true, 'newCount' => $newCount]);
    }
}
?>