SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE DATABASE IF NOT EXISTS `hackathon`;
USE `hackathon`;

-- Structure de la table `messages`
CREATE TABLE `messages` (
                            `id` int(11) NOT NULL,
                            `author` varchar(255) NOT NULL,
                            `text` text NOT NULL,
                            `time` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE `messages`
    ADD PRIMARY KEY (`id`);

ALTER TABLE `messages`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

-- Structure de la table `info`
CREATE TABLE `info` (
                        `id` int(11) NOT NULL AUTO_INCREMENT,
                        `nom` varchar(255) NOT NULL,
                        `description` text,
                        `niveauDanger` varchar(50) NOT NULL,
                        `type` varchar(100) NOT NULL,
                        `date` datetime NOT NULL,
                        `zone` int(11) NOT NULL,
                        `intensite_valeur` decimal(10,2),
                        `intensite_unite` varchar(50),
                        PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Structure de la table `activities`
CREATE TABLE `activities` (
                              `id` int(11) NOT NULL AUTO_INCREMENT,
                              `nom` varchar(255) NOT NULL,
                              `type` varchar(100) NOT NULL,
                              `description` text,
                              `dateEtHeure` datetime NOT NULL,
                              `danger` varchar(255) NOT NULL,
                              `nombreDeParticipants` int(11) NOT NULL,
                              `zone` int(11) NOT NULL,
                              PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertion d'un exemple dans la table activities
INSERT INTO `activities` (`nom`, `type`, `description`, `dateEtHeure`, `danger`, `nombreDeParticipants`, `zone`)
VALUES (
           'Course en radeau improvisé',
           'inondation',
           'Fabriquez un radeau avec des matériaux recyclés et naviguez sur un parcours aquatique.',
           '2025-03-10 10:00:00',
           'Modéré : attention aux éclaboussures.',
           8,
           2
       );

INSERT INTO activities (nom, type, description, dateEtHeure, danger, nombreDeParticipants, zone) VALUES
                                                                                                     ("Construction de digue express", "inondation", "Compétition où les participants construisent des digues pour bloquer une montée d'eau simulée.", "2025-02-15 14:00:00", "Faible : simulation avec eau contrôlée.", 10, 1),
                                                                                                     ("Course en radeau improvisé", "inondation", "Fabriquez un radeau avec des matériaux recyclés et naviguez sur un parcours aquatique.", "2025-03-10 10:00:00", "Modéré : attention aux éclaboussures.", 8, 2),
                                                                                                     ("Relais sac de sable", "inondation", "Un relais où chaque équipe doit remplir et transporter des sacs de sable pour construire une barrière.", "2025-04-05 16:30:00", "Faible : exercice physique léger.", 15, 3),
                                                                                                     ("Simulation d'évacuation en zone inondée", "inondation", "Un parcours d'obstacles où les participants doivent évacuer des objets d'une zone inondée.", "2025-05-20 18:00:00", "Modéré : obstacles physiques.", 12, 4),
                                                                                                     ("Escape game post-séisme", "séisme", "Résolvez des énigmes pour sortir d'un bâtiment endommagé dans une simulation de séisme.", "2025-06-12 10:00:00", "Faible : simulation sans risques.", 6, 2),
                                                                                                     ("Jeu de rôle secouriste après séisme", "séisme", "Les participants jouent le rôle de secouristes pour retrouver des survivants dans une zone sinistrée simulée.", "2025-07-03 15:30:00", "Modéré : simulation réaliste.", 10, 5),
                                                                                                     ("Simulation de refuge temporaire", "séisme", "Construisez un abri temporaire avec des matériaux basiques après un séisme simulé.", "2025-08-10 09:00:00", "Faible : apprentissage pratique.", 8, 1),
                                                                                                     ("Reconstruction express", "séisme", "Compétition pour reconstruire une maison miniature après un séisme.", "2025-09-15 13:00:00", "Faible : simulation ludique.", 5, 3),
                                                                                                     ("Ligne de défense contre un incendie", "incendie", "Les participants créent une zone de protection pour stopper un incendie simulé.", "2025-10-08 17:00:00", "Modéré : attention au matériel de simulation.", 10, 4),
                                                                                                     ("Évacuation sous la fumée", "incendie", "Un parcours où les participants doivent traverser une zone enfumée en toute sécurité.", "2025-11-05 20:00:00", "Modéré : simulation réaliste.", 6, 5),
                                                                                                     ("Simulation de prévention d'incendie", "incendie", "Apprenez à identifier les zones à risque et à éviter les départs de feu.", "2025-12-12 10:00:00", "Faible : apprentissage interactif.", 12, 1),
                                                                                                     ("Atelier de survie en sécheresse", "sécheresse", "Apprenez à économiser l'eau et à cultiver des plantes résistantes à la sécheresse.", "2026-01-10 11:00:00", "Faible : environnement contrôlé.", 8, 2),
                                                                                                     ("Marathon de l'eau", "sécheresse", "Une course où les participants doivent transporter de l'eau sur un parcours difficile.", "2026-02-25 15:00:00", "Modéré : attention au terrain.", 10, 3),
                                                                                                     ("Simulation de gestion de sécheresse", "sécheresse", "Apprenez à distribuer l'eau équitablement dans une simulation de pénurie.", "2026-03-15 09:30:00", "Faible : apprentissage interactif.", 5, 4),
                                                                                                     ("Simulation d'évacuation d'ouragan", "ouragan", "Préparez votre maison et évacuez rapidement avant un ouragan simulé.", "2026-04-01 14:00:00", "Modéré : simulation intense.", 20, 2),
                                                                                                     ("Jeu de rôle secouriste d'ouragan", "ouragan", "Les participants jouent des secouristes aidant des survivants après un ouragan simulé.", "2026-05-10 13:00:00", "Faible : apprentissage pratique.", 12, 5),
                                                                                                     ("Construction d'abris anti-ouragan", "ouragan", "Construisez un abri capable de résister à des vents simulés d'ouragan.", "2026-06-20 09:00:00", "Modéré : simulation réaliste.", 8, 3);

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;