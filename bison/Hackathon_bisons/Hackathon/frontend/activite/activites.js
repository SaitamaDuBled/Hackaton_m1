let activites = [];
const API_ACTIVITIES_ENDPOINT = "/api/activites";

async function chargerActivites() {
    try {
        const response = await fetch(API_ACTIVITIES_ENDPOINT);
        if (!response.ok) throw new Error('Erreur réseau');
        activites = await response.json();
        if (!Array.isArray(activites)) throw new Error('Les données reçues ne sont pas valides.');
        afficherActivites(activites);
    } catch (error) {
        afficherErreur('Impossible de charger les activités. Veuillez réessayer plus tard.');
        console.error('Erreur:', error);
    }
}

function filtrerParZone(zone = null) {
    let activitesFiltrees = zone === null ?
        activites :
        activites.filter(activite => activite.zone === zone.toString());
    afficherActivites(activitesFiltrees);
}

async function chargerActivites() {
    try {
        const response = await fetch(API_ACTIVITIES_ENDPOINT);
        if (!response.ok) throw new Error('Erreur réseau');
        activites = await response.json();
        if (!Array.isArray(activites)) {
            throw new Error('Les données reçues ne sont pas valides.');
        }
        afficherActivites(activites);
        console.log(activites);
    } catch (error) {
        afficherErreur('Impossible de charger les activités. Veuillez réessayer plus tard.');
        console.error('Erreur lors du chargement des activités:', error);
    }
}

function afficherActivites(activitesFiltrees) {
    const container = document.getElementById('activites-container');
    container.innerHTML = '';
    activitesFiltrees.forEach(activite => {
        const card = creerCarteActivite(activite);
        container.appendChild(card);
    });
}

function creerCarteActivite(activite) {
    const card = document.createElement('div');
    card.className = 'activity-card';
    const inscrit = localStorage.getItem(`activite-${activite.nom}`) === 'true';

    card.innerHTML = `
   <h2>${activite.nom}</h2>
   <p><strong>Type:</strong> ${activite.type}</p>
   <p><strong>Description:</strong> ${activite.description}</p>
   <p><strong>Date:</strong> ${new Date(activite.dateEtHeure).toLocaleString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    })}</p>
   <p><strong>Danger:</strong> ${activite.danger}</p>
   <p><strong>Nombre de participants:</strong> <span id="participants-${activite.nom}">${activite.nombreDeParticipants}</span></p>
   <p><strong>Zone:</strong> ${activite.zone}</p>
   <button 
     class="toggle-inscription ${inscrit ? 'inscrit' : ''}" 
     onclick="toggleInscription('${activite.id}')"
     data-inscrit="${inscrit}">
     ${inscrit ? 'Se désinscrire' : 'S\'inscrire'}
   </button>
 `;

    return card;
}



function afficherErreur(message) {
    const container = document.getElementById('activites-container');
    container.innerHTML = `<p class="error">${message}</p>`;
}

async function toggleInscription(activityId) {
    const activite = activites.find(a => a.id === activityId);
    const bouton = document.querySelector(`button[onclick="toggleInscription('${activityId}')"]`);
    const estInscrit = bouton.dataset.inscrit === 'true';

    if (bouton.disabled) return; // Évite les clics multiples
    bouton.disabled = true;

    try {
        const response = await fetch('/api/update_activite', {
            method: 'POST',
            body: new URLSearchParams({
                id: activityId,
                action: estInscrit ? 'decrement' : 'increment'
            })
        });

        if (response.ok) {
            const newCount = estInscrit ?
                activite.nombreDeParticipants - 1 :
                activite.nombreDeParticipants + 1;

            activite.nombreDeParticipants = newCount;
            document.getElementById(`participants-${activite.nom}`).textContent = newCount;

            bouton.dataset.inscrit = (!estInscrit).toString();
            bouton.textContent = estInscrit ? 'S\'inscrire' : 'Se désinscrire';
            bouton.classList.toggle('inscrit');

            estInscrit ?
                localStorage.removeItem(`activite-${activite.nom}`) :
                localStorage.setItem(`activite-${activite.nom}`, 'true');
        }
    } catch (error) {
        console.error('Erreur:', error);
    } finally {
        bouton.disabled = false;
    }
}

chargerActivites();

