<?php
$zone = isset($_GET['id']) ? intval($_GET['id']) : 1;
if ($zone < 1 || $zone > 5) {
    http_response_code(404);
    echo "Zone invalide";
    exit;
}
?>

<?php 
$titiPage = "Zone $zone";
require './frontend/general/header/header.php';
 ?>

    <div class="container-fluid">
        <div class="row">
            <!-- Colonne gauche : Infos de la zone -->
            <div class="col-md-6 border-end" id="zone-section">
                <div class="cyber-grid"></div>
                <h1 class="title">░▒▓█ SYSTÈME DE SURVEILLANCE ZONE <?php echo $zone; ?> █▓▒░</h1>
                <div class="info-container" id="info-list"></div>
            </div>

            <!-- Colonne droite : Chat -->
            <div class="col-md-6" id="chat-section">
                <?php include 'frontend/zones/chat/chat.php'; ?>
            </div>
        </div>
    </div>

    <!-- Scripts spécifiques -->
    <script src="/frontend/zones/infos/simulation.js"></script>
    <script src="/frontend/zones/infos/info.js"></script>

    <script>
        // Gestion des infos de la zone
        const zone = <?php echo $zone; ?>;
        new InfoManager(zone);
        setInterval(async () => {
            generateAndSendDisaster(zone)
        }, 5000);
    </script>
</body>
</html>