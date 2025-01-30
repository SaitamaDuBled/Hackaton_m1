// Descriptions amusantes inchangées
const FUNNY_DESCRIPTIONS = {
    séisme: [
        "Les bâtiments font la danse de la macarena !",
        "Les habitants surfent sur le bitume qui ondule",
        "Même les statues se mettent à faire du twerk",
        "Le sol joue au trampoline avec les voitures",
        "Les pigeons sont complètement désorientés et volent en zigzag"
    ],
    inondation: [
        "Promotion sur les cours de natation en ville !",
        "Les canards envahissent le centre-ville et réclament le pouvoir",
        "Les poissons visitent les appartements du rez-de-chaussée",
        "Nouvelle attraction aquatique urbaine non planifiée",
        "Les habitants font du kayak pour aller chercher leur baguette"
    ],
    ouragan: [
        "Les parapluies migrent vers de nouveaux horizons",
        "Les chats volants sont de sortie",
        "Coiffeur gratuit pour tout le monde !",
        "Les oiseaux volent à reculons",
        "Les arbres font du breakdance"
    ],
    combat: [
        "Bagarre générale façon dessin animé",
        "Les grands-mères sortent leurs sacs à main tactiques",
        "Les ninjas de Toulouse entrent en action",
        "Battle royale version baguette de pain",
        "Guerre des croissants contre les pains au chocolat"
    ],
    "pluie acide": [
        "Les parapluies deviennent des passoires",
        "Les escargots portent des mini-imperméables",
        "Les voitures prennent un bain effervescent gratuit",
        "Le nouveau parfum 'Eau de Javel' est dans l'air",
        "Les vers de terre demandent l'asile politique en sous-sol"
    ],
    météorite: [
        "Feu d'artifice spatial non programmé",
        "Les aliens ratent encore leur atterrissage",
        "Nouveau programme de rénovation urbaine express",
        "Livraison express de cailloux de l'espace",
        "Le ciel nous fait un high five cosmique"
    ],
    "canicule extrême": [
        "Les pingouins demandent l'asile climatique",
        "Les glaciers deviennent des piscines express",
        "Même Satan trouve qu'il fait un peu chaud",
        "Les habitants se transforment en glaçons ambulants",
        "Les plantes demandent un ventilateur"
    ],
    tsunami: [
        "Surf urbain improvisé !",
        "Les poissons visitent la ville",
        "Grande lessive collective non planifiée",
        "Les sirènes viennent dire bonjour",
        "Pool party surprise pour tout le monde !"
    ],
    épidémie: [
        "Les microbes font leur meeting annuel",
        "Nouveau concours de masques fashion",
        "Les médecins deviennent des rock stars",
        "Les gels hydroalcooliques sont les nouveaux parfums",
        "Les virus organisent leur convention annuelle"
    ],
    "invasion alien": [
        "Les extraterrestres cherchent désespérément des croissants",
        "E.T. cherche toujours la maison",
        "Les soucoupes volantes embouteillent le périph",
        "Les Martiens veulent apprendre la pétanque",
        "Les aliens découvrent avec horreur la cuisine française"
    ]
};

// Types de catastrophes avec zones spécifiques et échelles d'intensité
const DISASTER_TYPES = {
    SEISME: {
        name: 'séisme',
        allowedZones: [1, 3, 4], // Zones sismiques
        intensityUnit: 'magnitude',
        minIntensity: 4,
        maxIntensity: 9,
        // Fonction personnalisée pour calculer le niveau de danger
        getDangerLevel: (intensity) => {
            if (intensity <= 5) return 1;
            if (intensity <= 6) return 2;
            if (intensity <= 7) return 3;
            if (intensity <= 8) return 4;
            return 5;
        }
    },
    INONDATION: {
        name: 'inondation',
        allowedZones: [2, 3, 4], // Zones près des cours d'eau
        intensityUnit: 'mètres',
        minIntensity: 1,
        maxIntensity: 15,
        getDangerLevel: (intensity) => {
            if (intensity <= 3) return 1;
            if (intensity <= 6) return 2;
            if (intensity <= 9) return 3;
            if (intensity <= 12) return 4;
            return 5;
        }
    },
    OURAGAN: {
        name: 'ouragan',
        allowedZones: [1, 2], // Zones côtières principalement
        intensityUnit: 'km/h',
        minIntensity: 120,
        maxIntensity: 300,
        getDangerLevel: (intensity) => {
            if (intensity <= 150) return 1;
            if (intensity <= 180) return 2;
            if (intensity <= 210) return 3;
            if (intensity <= 250) return 4;
            return 5;
        }
    },
    COMBAT: {
        name: 'combat',
        allowedZones: [1, 2, 3], // Zones urbaines principalement
        intensityUnit: 'niveau de menace',
        minIntensity: 1,
        maxIntensity: 10,
        getDangerLevel: (intensity) => {
            if (intensity <= 2) return 1;
            if (intensity <= 4) return 2;
            if (intensity <= 6) return 3;
            if (intensity <= 8) return 4;
            return 5;
        }
    },
    PLUIE_ACIDE: {
        name: 'pluie acide',
        allowedZones: [2, 4, 5], // Zones industrielles et urbaines
        intensityUnit: 'pH',
        minIntensity: 0,
        maxIntensity: 6,
        getDangerLevel: (intensity) => {
            // Pour le pH, plus c'est bas, plus c'est dangereux
            if (intensity >= 5) return 1;
            if (intensity >= 4) return 2;
            if (intensity >= 3) return 3;
            if (intensity >= 1) return 4;
            return 5;
        }
    },
    METEOR: {
        name: 'météorite',
        allowedZones: [1, 2, 3, 4, 5], // Peut tomber n'importe où
        intensityUnit: 'mètres de diamètre',
        minIntensity: 1,
        maxIntensity: 100,
        getDangerLevel: (intensity) => {
            if (intensity <= 5) return 1;
            if (intensity <= 15) return 2;
            if (intensity <= 30) return 3;
            if (intensity <= 60) return 4;
            return 5;
        }
    },
    CANICULE: {
        name: 'canicule extrême',
        allowedZones: [2, 3, 5], // Zones à risque de chaleur
        intensityUnit: '°C',
        minIntensity: 35,
        maxIntensity: 50,
        getDangerLevel: (intensity) => {
            if (intensity <= 37) return 1;
            if (intensity <= 40) return 2;
            if (intensity <= 43) return 3;
            if (intensity <= 46) return 4;
            return 5;
        }
    },
    TSUNAMI: {
        name: 'tsunami',
        allowedZones: [1, 2],
        intensityUnit: 'mètres',
        minIntensity: 3,
        maxIntensity: 30,
        getDangerLevel: (intensity) => {
            if (intensity <= 5) return 1;
            if (intensity <= 10) return 2;
            if (intensity <= 15) return 3;
            if (intensity <= 20) return 4;
            return 5;
        }
    },
    EPIDEMIE: {
        name: 'épidémie',
        allowedZones: [1, 2, 3, 4, 5], // Toutes les zones
        intensityUnit: 'taux de contamination',
        minIntensity: 1,
        maxIntensity: 100,
        getDangerLevel: (intensity) => {
            if (intensity <= 20) return 1;
            if (intensity <= 40) return 2;
            if (intensity <= 60) return 3;
            if (intensity <= 80) return 4;
            return 5;
        }
    },
    ALIEN: {
        name: 'invasion alien',
        allowedZones: [1, 2, 3, 4, 5], // Peuvent envahir partout
        intensityUnit: 'niveau de danger',
        minIntensity: 1,
        maxIntensity: 10,
        getDangerLevel: (intensity) => {
            if (intensity <= 2) return 1;
            if (intensity <= 4) return 2;
            if (intensity <= 6) return 3;
            if (intensity <= 8) return 4;
            return 5;
        }
    }
};

// Ajout des composants de noms pour chaque type de catastrophe
const DISASTER_NAMES = {
    séisme: {
        prefixes: ['Gronde', 'Tremble', 'Secoue', 'Vibre', 'Oscille'],
        suffixes: ['Terre', 'Sol', 'Roche', 'Faille', 'Croûte']
    },
    inondation: {
        prefixes: ['Déluge', 'Cascade', 'Torrent', 'Flot', 'Vague'],
        suffixes: ['Aquatique', 'Fluvial', 'Maritime', 'Pluvial', 'Hydrique']
    },
    ouragan: {
        prefixes: ['Rafale', 'Souffle', 'Tempête', 'Cyclone', 'Tourbillon'],
        suffixes: ['Violent', 'Dévastateur', 'Furieux', 'Déchaîné', 'Impétueux']
    },
    combat: {
        prefixes: ['Bagarre', 'Clash', 'Bataille', 'Conflit', 'Duel'],
        suffixes: ['Urbain', 'Tactique', 'Stratégique', 'Intensif', 'Chaotique']
    },
    'pluie acide': {
        prefixes: ['Brûle', 'Corrode', 'Dissout', 'Ronge', 'Attaque'],
        suffixes: ['Chimique', 'Toxique', 'Corrosif', 'Acide', 'Caustique']
    },
    météorite: {
        prefixes: ['Chute', 'Impact', 'Crash', 'Frappe', 'Collision'],
        suffixes: ['Céleste', 'Spatial', 'Cosmique', 'Astral', 'Stellaire']
    },
    'canicule extrême': {
        prefixes: ['Braise', 'Fournaise', 'Chaleur', 'Brasier', 'Ardeur'],
        suffixes: ['Torride', 'Brûlant', 'Suffocant', 'Étouffant', 'Ardent']
    },
    tsunami: {
        prefixes: ['Lame', 'Déferle', 'Submerge', 'Inonde', 'Engloutit'],
        suffixes: ['Marin', 'Océanique', 'Côtier', 'Maritime', 'Littoral']
    },
    épidémie: {
        prefixes: ['Propage', 'Contamine', 'Infecte', 'Répand', 'Diffuse'],
        suffixes: ['Viral', 'Bactérien', 'Pathogène', 'Contagieux', 'Infectieux']
    },
    'invasion alien': {
        prefixes: ['Invasion', 'Contact', 'Arrivée', 'Descente', 'Incursion'],
        suffixes: ['Extraterrestre', 'Galactique', 'Alien', 'Interstellaire', 'Spatial']
    }
};
// [Les constantes FUNNY_DESCRIPTIONS, DISASTER_TYPES, et DISASTER_NAMES restent inchangées...]

// Utilitaires
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Fonction pour trouver les types de catastrophes possibles pour une zone donnée
function getDisasterTypesForZone(zone) {
    return Object.values(DISASTER_TYPES).filter(type =>
        type.allowedZones.includes(zone)
    );
}

// Fonction pour générer un nom aléatoire basé sur le type
function generateDisasterName(type) {
    const nameComponents = DISASTER_NAMES[type];
    if (!nameComponents) return type.charAt(0).toUpperCase() + type.slice(1);

    const prefix = getRandomElement(nameComponents.prefixes);
    const suffix = getRandomElement(nameComponents.suffixes);
    return `${prefix}-${suffix}`;
}

// Génère une catastrophe pour une zone spécifique
function generateDisaster(zone) {
    // Récupère les types de catastrophes possibles pour cette zone
    const possibleTypes = getDisasterTypesForZone(zone);

    // Si aucun type n'est possible pour cette zone, retourne null
    if (possibleTypes.length === 0) {
        return null;
    }

    // Sélectionne un type aléatoire parmi les possibles
    const selectedType = getRandomElement(possibleTypes);

    const intensity = randomNumber(selectedType.minIntensity, selectedType.maxIntensity);
    const funnyDescription = getRandomElement(FUNNY_DESCRIPTIONS[selectedType.name]);
    const dangerLevel = selectedType.getDangerLevel(intensity);
    const generatedName = generateDisasterName(selectedType.name);

    return {
        nom: generatedName,
        description: funnyDescription,
        niveauDanger: dangerLevel,
        type: selectedType.name,
        zone: zone,
        intensite_valeur: intensity,
        intensite_unite: selectedType.intensityUnit
    };
}

// Fonction principale pour générer et envoyer une catastrophe
function generateAndSendDisaster(zone) {
    const disaster = generateDisaster(zone);

    if (!disaster) {
        console.error('Aucune catastrophe possible dans la zone', zone);
        return null;
    }

    console.log('Nouvelle catastrophe générée:', disaster);

    // Envoi à l'API
    fetch('/api/add-info', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(disaster)
    }).catch(error => console.error('Erreur:', error));

    return disaster;
}