# Étape 1 : Utiliser l'image officielle Node.js pour construire l'application Angular
FROM node:18 AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Installer Angular CLI globalement
RUN npm install -g @angular/cli

# Copier tous les fichiers source dans le conteneur
COPY . .

# Construire l'application Angular pour la production
RUN npm run build --prod

# Étape 2 : Créer l'image de production en utilisant un serveur web léger (Nginx)
FROM nginx:alpine

# Copier les fichiers de build depuis l'étape précédente dans le répertoire par défaut de Nginx
COPY --from=build /app/dist/frontend/browser/ /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

# Exposer le port 80 pour que l'application soit accessible via HTTP
EXPOSE ${FRONT_PORT}

# Démarrer Nginx en mode non-daemon (en premier plan)
CMD ["nginx", "-g", "daemon off;"]
