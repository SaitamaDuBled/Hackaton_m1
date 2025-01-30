$(document).ready(() => {
    $('#alert-popup').css('display', 'none');

    function fetchAndRotateNews() {
        $.ajax({
            url: '/api/flash-infos',
            method: 'GET',
            success: (data) => {
                startNewsRotation(data.flash_infos);
            },
            error: () => {
                console.error('Erreur de chargement des flash infos');
                $('#flash-container').removeClass('active');
            }
        });
    }

    fetchAndRotateNews();
    setInterval(fetchAndRotateNews, 30000);

    $('#alert-close').on('click', () => {
        $('#alert-popup').css('display', 'none');
    });

    function startNewsRotation(flashInfos) {
        if (flashInfos.length === 0) {
            $('#flash-container').removeClass('active');
            return;
        }

        const level5Infos = flashInfos.filter(info => info.niveau === "5" && !info.shown);

        if (level5Infos.length === 0) {
            $('#flash-container').removeClass('active');
            return;
        }

        const info = level5Infos.length > 0 
            ? level5Infos[Math.floor(Math.random() * level5Infos.length)]
            : flashInfos[Math.floor(Math.random() * flashInfos.length)];
       
        $('#flash-content').html(`
            <span class="breaking">FLASH INFOS</span>
            <span class="flash-text">${info.nom} : ${info.description} (Niveau: ${info.niveau})</span>
        `);

        $('#flash-container').addClass('active');
        $('#flash-content').addClass('scrolling');

        if (info.niveau === "5" && $('#alert-popup').css('display') === 'none') {
            setTimeout(() => {
                $('#alert-title').text(`ALERTE NIVEAU ${info.niveau} : ${info.nom}`);
                $('#alert-description').text(info.description);
                $('#alert-preventive-message').text(getPreventiveMessage(info.type.toLowerCase())); // Transforme en minuscule pour éviter les erreurs de casse.
                $('#alert-popup').css('display', 'flex');
                info.shown = true;
            }, 5000);
        }

        setupRotationTimer(flashInfos);
    }

    function getPreventiveMessage(category) {
        const messages = {
            "séisme": "Cachez-vous sous la table la plus stylée de la pièce, elle mérite de survivre autant que vous.",
            "inondation": "Transformez votre baignoire en canoë et pagayez vers les hauteurs comme un héros aquatique.",
            "ouragan": "Accrochez-vous à votre chapeau ! Si vous n’en avez pas, improvisez avec une passoire.",
            "combat": "Apprenez le kung-fu en 10 minutes grâce à un tutoriel YouTube… bonne chance !",
            "pluie acide": "Sortez avec un parapluie en métal, et n’oubliez pas vos bottes en adamantium.",
            "météorite": "Placez un matelas sur votre toit. Ça amortira peut-être le choc. Peut-être.",
            "tsunami": "Prenez votre planche de surf et devenez la star des vidéos virales.",
            "épidémie": "Enfilez votre plus beau pyjama hazmat et devenez le roi de la distanciation sociale.",
            "invasion alien": "Apprenez la danse Macarena. Les aliens respectent les pros de la danse.",
            "astronomie": "Sortez un télescope et criez : 'Je l’avais vu venir !' pour impressionner vos voisins.",
            "mode": "Portez des vêtements réfléchissants. Si le danger persiste, au moins vous serez visible.",
            "animaux": "Essayez de parler leur langage. Si ça échoue, offrez-leur des snacks, ça marche toujours."
        };

        return messages[category] || "Restez vigilant et suivez les recommandations des autorités compétentes.";
    }

    function setupRotationTimer(flashInfos) {
        let rotationCount = 0;
        const MAX_ROTATIONS = 3;
        const ROTATION_INTERVAL = 20000;
        const PAUSE_INTERVAL = 10000;

        const rotationTimer = setInterval(() => {
            rotationCount++;
            if (rotationCount >= MAX_ROTATIONS) {
                clearInterval(rotationTimer);
                $('#flash-content').removeClass('scrolling');
                $('#flash-container').removeClass('active');

                setTimeout(() => startNewsRotation(flashInfos), PAUSE_INTERVAL);
            }
        }, ROTATION_INTERVAL);
    }
});
