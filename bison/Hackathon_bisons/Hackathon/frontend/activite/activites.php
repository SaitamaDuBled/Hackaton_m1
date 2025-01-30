<?php 
$titrePage = "Activités Catastrophes Naturelles";
require 'frontend/general/header/header.php';
?>
  <header>
    <div class="container">
      <h1>Activités Catastrophes Naturelles</h1>
      <div class="filter-buttons my-3">
        <button type="button" class="btn btn-light me-2 " onclick="filtrerParZone()">Toutes les zones</button>
        <button type="button" class="btn btn-light mx-2" onclick="filtrerParZone(1)">Zone 1</button>
        <button type="button" class="btn btn-light mx-2" onclick="filtrerParZone(2)">Zone 2</button>
        <button type="button" class="btn btn-light mx-2" onclick="filtrerParZone(3)">Zone 3</button>
        <button type="button" class="btn btn-light mx-2" onclick="filtrerParZone(4)">Zone 4</button>
        <button type="button" class="btn btn-light mx-2" onclick="filtrerParZone(5)">Zone 5</button>
      </div>
    </header>
    <main>
      <div id="activites-container" class="d-flex flex-wrap justify-content-center p-2"></div>
    </main>
    </div>
  <script src="frontend/activite/activites.js"></script>
</body>
</html>

