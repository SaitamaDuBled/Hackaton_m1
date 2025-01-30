const dangerText = ["LOW", "MEDIUM", "HIGH", "CRITICAL", "APOCALYPTIC"]

class InfoManager {
    constructor(zone) {
        this.zone = zone;
        this.infos = [];
        this.container = document.getElementById('info-list');
        this.loadInitialInfo();
        this.startPolling();
    }

    async loadInitialInfo() {
        try {
            const response = await fetch(`/api/load-init-info?zone=${this.zone}`);
            this.infos = await response.json();
            this.displayInfos();
        } catch (error) {
            console.error('Error:', error);
        }
    }

    startPolling() {
        setInterval(async () => {
            try {
                const response = await fetch(`/api/stream-info?zone=${this.zone}&last_id=${this.infos[0]?.id || 0}`);
                const data = await response.json();

                if (data.hasNew && data.data) {
                    this.infos.unshift(data.data);
                    if (this.infos.length > 50) this.infos.pop();
                    this.displayInfos();
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }, 5000);
    }

    displayInfos() {
        const newContent = this.infos.map((info, index) => `
                    <div class="info-card danger-${info.niveauDanger} ${index === 0 ? 'new-card' : 'existing-card'}" data-id="${info.id}">
                        <div class="info-header">
                              <h3 class="title-info-card-h3">${info.nom}</h3>
                            <span class="zone-badge">${dangerText[info.niveauDanger-1]}</span>
                        </div>
                        <p>${info.description}</p>
                        <div class="info-details">
                            <span>► TYPE: ${info.type}</span>
                            <br>► INTENSITÉ: ${info.intensite_valeur} ${info.intensite_unite}
                            <br>► DANGER: ${info.niveauDanger}/5
                            <br>► TIME: ${new Date(info.date).toLocaleString()}
                        </div>
                    </div>
                `).join('');

        this.container.innerHTML = newContent;
    }
}