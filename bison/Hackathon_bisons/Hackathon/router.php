<?php
// Fichier : router.php
$request = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH); // Ne garde que le chemin sans query string
error_log($_SERVER['REQUEST_URI']);

// Si le fichier demandé existe, le servir directement
if (file_exists(__DIR__ . $request) && !is_dir(__DIR__ . $request)) {
    return false; // Laisser PHP servir directement le fichier
}

switch ($request) {
    case '/':
        require __DIR__ . '/index.php';
        break;
    case '/admin':
        require __DIR__ . '/admin.php';
        break;
    case '/zone':
        require __DIR__ . '/frontend/zones/zone.php';
        break;
    case '/api/flash-infos':
        require __DIR__ . '/backend/api/info/fetch_flash_infos.php';
        break;
    case '/api/chat':
        require __DIR__ . '/backend/api/chat/chat_api.php';
        break;
    case '/api/load-init-info':
        require __DIR__ . '/backend/api/info/load_init.php';
        break;
    case '/api/stream-info':
        require __DIR__ . '/backend/api/info/stream_info.php';
        break;
    case '/api/add-info':
        require __DIR__ . '/backend/api/info/insert.php';
        break;
    case '/activites':
        require __DIR__ . '/frontend/activite/activites.php';
        break;
    case '/api/activites':
        require __DIR__ . '/backend/api/activites/activities.php';
        break;
    case '/api/update_activite':
        require __DIR__ . '/backend/api/activites/update.php';
        break;
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Page not found']);
        break;
}
?>